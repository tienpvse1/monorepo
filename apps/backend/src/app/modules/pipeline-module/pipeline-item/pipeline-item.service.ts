import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../../kysely';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemIndexDto } from './dto/update-pipeline-item.dto';

@Injectable()
export class PipelineItemService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async updatePipelineItemIndex(id: string, dto: UpdatePipelineItemIndexDto) {
    const updatedIndex = (dto.bottomIndex + dto.topIndex) / 2;
    const updateFn = this.kysely
      .updateTable('pipelineItem')
      .set({ index: updatedIndex, pipelineColumnId: dto.newStageId })
      .where('id', '=', id)
      .returningAll()
      .execute();
    const [updatedItem, error] = await resolve(updateFn);
    if (!updatedItem || error)
      throw new BadRequestException('cannot update pipeline item');
    return updatedItem;
  }

  async findOwnPipelineItems(accountId: string) {
    return this.kysely
      .selectFrom('pipelineItem')
      .leftJoin(
        'accountPipeline',
        'accountPipeline.accountId',
        'pipelineItem.id'
      )
      .where('accountPipeline.accountId', '=', accountId)
      .selectAll('pipelineItem')
      .execute();
  }

  async createPipelineItemForSale(
    dto: CreateSinglePipelineItemDto,
    accountId: string
  ) {
    const createFn = this.kysely
      .insertInto('pipelineItem')
      .values({ ...dto, createdById: accountId })
      .returningAll()
      .executeTakeFirst();
    const [createdItem, err] = await resolve(createFn);
    await this.kysely
      .insertInto('accountPipelineItem')
      .values({ pipelineItemId: createdItem.id, accountId })
      .execute();
    if (!createdItem || err)
      throw new BadRequestException('cannot create pipeline item');
    return createdItem;
  }

  async createPipelineItem(
    dto: CreateSinglePipelineItemDto,
    accountId: string,
    managerId: string
  ) {
    if (!accountId) accountId = managerId;
    const createFn = this.kysely
      .insertInto('pipelineItem')
      .values({ ...dto, createdById: managerId })
      .returningAll()
      .executeTakeFirst();
    const [createdPipelineItem, err] = await resolve(createFn);
    if (err) throw new BadRequestException('cannot create pipeline item');
    await this.kysely
      .insertInto('accountPipelineItem')
      .values([
        { pipelineItemId: createdPipelineItem.id, accountId },
        { pipelineItemId: createdPipelineItem.id, accountId: managerId },
      ])
      .execute();
    return createdPipelineItem;
  }

  async assignAccount(id: string, accountId: string) {
    const assignFn = this.kysely
      .insertInto('accountPipelineItem')
      .values({ accountId, pipelineItemId: id })
      .returningAll()
      .executeTakeFirstOrThrow();
    const [assignedResult, err] = await resolve(assignFn);
    if (err) throw new BadRequestException('cannot assign this pipeline item');
    return this.kysely
      .selectFrom('pipelineItem')
      .where('id', '=', assignedResult.pipelineItemId)
      .executeTakeFirst();
  }

  async restorePipelineItem(id: string) {
    const restoreFn = this.kysely
      .updateTable('pipelineItem')
      .set({ deletedAt: null })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    const [restoreResult, err] = await resolve(restoreFn);
    if (!restoreResult || err)
      throw new BadRequestException('cannot restore pipeline item');
    return restoreResult;
  }

  async softDelete(id: string) {
    return this.kysely
      .updateTable('pipelineItem')
      .set({ deletedAt: new Date() })
      .returningAll()
      .executeTakeFirst();
  }

  async markAsLost(id: string) {
    return this.kysely
      .updateTable('pipelineItem')
      .set({ lost: true })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
}
