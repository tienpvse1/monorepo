/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { AccountRepository } from 'src/modules/account/account.repository';
import { InternalSendNotificationPayload } from 'src/modules/notification/dto/internal-send-notification.dto';
import { KnexCreateOpportunityRevenueDto } from 'src/modules/opportunity-revenue/dto/create-opportunity-revenue.dto';
import { Reason } from 'src/modules/reason/entities/reason.entity';
import { reIndexItems } from 'src/util/pipeline-column';
// import { reIndexItems } from 'src/util/pipeline-column';
import { getCustomRepository, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import {
  CreateSinglePipelineItemDto,
  KnexCreatePipelineItemForSaleDto,
} from './dto/create-pipeline-item.dto';
import { ChangeStageDto } from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';

@Injectable()
export class PipelineItemService extends BaseService<PipelineItem> {
  constructor(
    @InjectRepository(PipelineItem)
    repository: Repository<PipelineItem>,
    private eventEmitter: EventEmitter2,
    @InjectKnex() private knex: Knex,
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
    const {
      columnId,
      contactId,
      opportunityRevenue,
      expectedClosing,
      expectedRevenue,
      ...rest
    } = dto;
    const pipelineItemId = nanoid(10);
    // create pipeline item
    await this.knex<KnexCreatePipelineItemForSaleDto>('pipeline_item').insert({
      id: pipelineItemId,
      account_id: accountId,
      pipeline_column_id: columnId,
      contact_id: contactId,
      expected_closing: new Date(expectedClosing),
      expected_revenue: expectedRevenue,
      ...rest,
    });

    // create revenue, attach created pipeline item's id to this revenue
    await this.knex<KnexCreateOpportunityRevenueDto>(
      'opportunity_revenue',
    ).insert({
      id: nanoid(10),
      course_id: opportunityRevenue.courseId,
      quantity: opportunityRevenue.quantity,
      pipeline_item_id: pipelineItemId,
    });

    return this.findOneItem({ where: { id: pipelineItemId } });
  }

  async createPipelineItem(
    dto: CreateSinglePipelineItemDto,
    accountId: string,
    managerId: string,
  ) {
    const { columnId, contactId, opportunityRevenue, ...rest } = dto;
    const pipelineItemId = nanoid(10);
    // create pipeline item
    await this.knex<KnexCreatePipelineItemForSaleDto>('pipeline_item').insert({
      id: pipelineItemId,
      account_id: accountId,
      creator_id: managerId,
      pipeline_column_id: columnId,
      contact_id: contactId,
      ...rest,
    });

    // create revenue, attach created pipeline item's id to this revenue
    await this.knex<KnexCreateOpportunityRevenueDto>(
      'opportunity_revenue',
    ).insert({
      id: nanoid(10),
      course_id: opportunityRevenue.courseId,
      quantity: opportunityRevenue.quantity,
      pipeline_item_id: pipelineItemId,
    });

    return this.findOneItem({ where: { id: pipelineItemId } });
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
    this.sendAssignMessage(managerId, accountId);
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return result;
  }

  async reassign(id: string, accountId: string, managerId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    const [pipelineItem, account] = await Promise.all([
      this.findOneItem({ where: { id }, relations: ['account'] }),
      accountRepository.findOneItem({
        where: { id: accountId },
      }),
    ]);
    this.sendUnassignMessage(managerId, pipelineItem.account.id);
    pipelineItem.account = account;
    const result = await pipelineItem.save();
    this.sendAssignMessage(managerId, accountId);
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return result;
  }

  sendUnassignMessage(managerId: string, accountId: string) {
    const payload: InternalSendNotificationPayload = {
      name: 'Assignment',
      description: 'Unassigned you an opportunity',
      receiverId: accountId,
      senderId: managerId,
    };
    this.eventEmitter.emit(InternalServerEvent.SEND_NOTIFICATION, payload);
  }

  sendAssignMessage(managerId: string, accountId: string) {
    const payload: InternalSendNotificationPayload = {
      name: 'Assignment',
      description: 'Assigned you an opportunity',
      receiverId: accountId,
      senderId: managerId,
    };
    this.eventEmitter.emit(InternalServerEvent.SEND_NOTIFICATION, payload);
  }

  async restorePipelineItem(id: string) {
    const pipelineItem = await this.findOneItem({
      where: { id },
      relations: ['reason'],
    });
    this.knex<Reason>('reason').where('id', pipelineItem.reason.id).del();
    return this.knex<PipelineItem>('pipeline_item')
      .where('id', '=', id)
      .update({
        // @ts-ignore
        is_lose: false,
      });
  }
}
