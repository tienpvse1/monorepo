/* eslint-disable @typescript-eslint/ban-ts-comment */
import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../../kysely';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';
import {
  ChangeStageDto,
  UpdatePipelineItemIndexDto,
} from './dto/update-pipeline-item.dto';

@Injectable()
export class PipelineItemService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async changeStage(id: string, dto: ChangeStageDto) {}

  async updatePipelineItemIndex(id: string, dto: UpdatePipelineItemIndexDto) {
    const updatedIndex = (dto.bottomIndex + dto.topIndex) / 2;
    const updateFn = this.kysely
      .updateTable('pipelineItem')
      .set({ index: updatedIndex, pipelineColumnId: dto.newStageId })
      .returningAll()
      .execute();
    const [updatedItem, error] = await resolve(updateFn);
    if (!updatedItem || error)
      throw new BadRequestException('cannot update pipeline item');
    return updatedItem;
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
      .values({ accountId, pipelineItemId: createdPipelineItem.id })
      .execute();
    return createdPipelineItem;
  }

  async assignAccount(id: string, accountId: string, managerId: string) {}

  sendUnassignMessage(managerId: string, accountId: string) {}

  sendAssignMessage(managerId: string, accountId: string) {}

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
