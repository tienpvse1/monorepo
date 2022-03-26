import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { AccountRepository } from 'src/modules/account/account.repository';
import { ContactRepository } from 'src/modules/contact/contact.repository';
import { CourseRepository } from 'src/modules/course/couse.repository';
import { InternalSendNotificationPayload } from 'src/modules/notification/dto/internal-send-notification.dto';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { reIndexItems } from 'src/util/pipeline-column';
// import { reIndexItems } from 'src/util/pipeline-column';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';
import { ChangeStageDto } from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';

@Injectable()
export class PipelineItemService extends BaseService<PipelineItem> {
  constructor(
    @InjectRepository(PipelineItem)
    repository: Repository<PipelineItem>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }

  async getColumn(dto: ChangeStageDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );
    const [oldColumn, newColumn] = await Promise.all([
      pipelineColumnRepository.findOneItem({
        where: { id: dto.oldStageId },
        relations: ['pipelineItems'],
      }),
      pipelineColumnRepository.findOneItem({
        where: { id: dto.newStageId },
        relations: ['pipelineItems'],
      }),
    ]);
    if (oldColumn == undefined || newColumn == undefined)
      throw new NotFoundException();
    return [oldColumn, newColumn];
  }

  async changeStage(id: string, dto: ChangeStageDto) {
    const [oldColumn, newColumn] = await this.getColumn(dto);
    reIndexItems(oldColumn);
    reIndexItems(newColumn);
    const item = oldColumn.pipelineItems.filter((item) => item.id === id)[0];
    if (!item) this.throwNotFoundException('item not found in old column');
    oldColumn.pipelineItems.splice(item.index, 1);

    newColumn.pipelineItems.splice(
      dto.index || newColumn.pipelineItems.length,
      0,
      item,
    );

    reIndexItems(oldColumn);
    reIndexItems(newColumn);

    await oldColumn.save();
    await newColumn.save();

    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return [oldColumn, newColumn];
  }

  // !this function can cause error when it comes to cascade update
  async updatePipelineItemIndex(
    id: string,
    columnId: string,
    { index }: QueryDeepPartialEntity<PipelineItem>,
  ) {
    const columnRepository = getCustomRepository(PipelineColumnRepository);
    const [item, column] = await Promise.all([
      this.findOneItem({
        where: {
          id,
        },
      }),
      columnRepository.findOneItem({ where: { id: columnId } }),
    ]);
    item.index = index as number;
    item.pipelineColumn = column;
    return item.save();
  }
  async createPipelineItemForSale(
    dto: CreateSinglePipelineItemDto,
    accountId: string,
  ) {
    const { columnId, contactId, opportunityRevenue, ...rest } = dto;

    const contactRepository = getCustomRepository(ContactRepository);
    const accountRepository = getCustomRepository(AccountRepository);
    const columnRepository = getCustomRepository(PipelineColumnRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const revenueRepository = getRepository(OpportunityRevenue);

    const [account, contact, pipelineColumn, course] = await Promise.all([
      accountRepository.findOneItem({ where: { id: accountId } }),
      contactRepository.findOneItem({ where: { id: contactId } }),
      columnRepository.findOneItem({ where: { id: columnId } }),
      courseRepository.findOneItem({
        where: { id: opportunityRevenue.courseId },
      }),
    ]);
    const revenue = await revenueRepository
      .create({
        quantity: opportunityRevenue.quantity,
        course,
      })
      .save();

    const createdPipelineItem = await this.repository
      .create({
        ...rest,
        account,
        contact,
        pipelineColumn,
        opportunityRevenue: revenue,
        createBy: account,
      })
      .save();

    return createdPipelineItem;
  }

  async createPipelineItem(
    dto: CreateSinglePipelineItemDto,
    accountId: string,
    managerId: string,
  ) {
    const { columnId, contactId, opportunityRevenue, ...rest } = dto;

    const contactRepository = getCustomRepository(ContactRepository);
    const accountRepository = getCustomRepository(AccountRepository);
    const columnRepository = getCustomRepository(PipelineColumnRepository);
    const courseRepository = getCustomRepository(CourseRepository);
    const revenueRepository = getRepository(OpportunityRevenue);

    const [account, manager, contact, pipelineColumn, course] =
      await Promise.all([
        accountRepository.findOneItem({ where: { id: accountId } }),
        accountRepository.findOneItem({ where: { id: managerId } }),
        contactRepository.findOneItem({ where: { id: contactId } }),
        columnRepository.findOneItem({ where: { id: columnId } }),
        courseRepository.findOneItem({
          where: { id: opportunityRevenue.courseId },
        }),
      ]);
    const revenue = await revenueRepository
      .create({
        quantity: opportunityRevenue.quantity,
        course,
      })
      .save();

    const createdPipelineItem = await this.repository
      .create({
        ...rest,
        account,
        contact,
        pipelineColumn,
        opportunityRevenue: revenue,
        createBy: manager,
      })
      .save();

    return createdPipelineItem;
  }

  async assignAccount(id: string, accountId: string, managerId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    const [pipelineItem, account] = await Promise.all([
      this.findOneItem({ where: { id } }),
      accountRepository.findOneItem({
        where: { id: accountId },
        relations: ['pipelineItems'],
      }),
    ]);

    if (!account.pipelineItems) account.pipelineItems = [];
    account.pipelineItems.push(pipelineItem);
    const result = await account.save();
    const payload: InternalSendNotificationPayload = {
      name: 'Assignment',
      description: 'Just assign you an opportunity',
      receiverId: accountId,
      senderId: managerId,
    };
    this.eventEmitter.emit(InternalServerEvent.SEND_NOTIFICATION, payload);
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return result;
  }
}
