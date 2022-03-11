import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InternalServerEvent } from 'src/constance/event';
import { reIndexColumn, sortColumns } from 'src/util/pipeline';
import { getRepository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { PipelineColumnService } from '../pipeline-column/pipeline-column.service';
import { PipelineItemService } from '../pipeline-item/pipeline-item.service';

@Injectable()
export class PipelineService {
  constructor(
    private eventEmitter: EventEmitter2,
    private itemService: PipelineItemService,
    private columnService: PipelineColumnService,
  ) {}
  async findOwnOnePipeline(userId: string) {
    const queryBuilder =
      getRepository(PipelineColumn).createQueryBuilder('pipelineColumn');
    const column = await queryBuilder
      .leftJoinAndSelect(
        'pipelineColumn.pipelineItems',
        'pipelineItems',
        'pipelineItems.account_id = :userId',
        { userId },
      )
      .leftJoinAndSelect('pipelineItems.schedules', 'schedules')
      .getMany();

    reIndexColumn(sortColumns(column));
    return column;
  }

  async updateColumns(pipelineColumns: PipelineColumn[]) {
    for (const { index, id } of pipelineColumns) {
      await this.columnService.updateColumnIndex(id, { index });
    }
  }
  async updateItems(pipelineColumns: PipelineColumn[]) {
    for (const column of pipelineColumns) {
      for (const { index, id } of column.pipelineItems) {
        await this.itemService.updatePipelineItemIndex(id, column.id, {
          index,
        });
      }
    }
  }

  async updatePipeline(columns: PipelineColumn[], accountId: string) {
    reIndexColumn(sortColumns(columns));

    await Promise.all([this.updateColumns(columns), this.updateItems(columns)]);

    const result = await this.findOwnOnePipeline(accountId);
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED, columns);

    return {
      id: 'QIECTiuvzY',
      createdAt: '2022-02-24T10:11:45.518Z',
      updatedAt: '2022-02-24T10:12:03.000Z',
      deletedAt: null,
      name: 'pipeline 1',
      pipelineColumns: result,
    };
  }
}
