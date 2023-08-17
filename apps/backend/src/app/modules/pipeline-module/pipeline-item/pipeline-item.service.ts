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
  ) {}

  async createPipelineItem(
    dto: CreateSinglePipelineItemDto,
    accountId: string,
    managerId: string
  ) {}

  async assignAccount(id: string, accountId: string, managerId: string) {}

  sendUnassignMessage(managerId: string, accountId: string) {}

  sendAssignMessage(managerId: string, accountId: string) {}

  async restorePipelineItem(id: string) {}
}
