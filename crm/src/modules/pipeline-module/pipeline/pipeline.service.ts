import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { reIndexPipeline, sortPipeline } from 'src/util/pipeline';
import { Repository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { PipelineColumnService } from '../pipeline-column/pipeline-column.service';
import { PipelineItemService } from '../pipeline-item/pipeline-item.service';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';

@Injectable()
export class PipelineService extends BaseService<Pipeline> {
  constructor(
    @InjectRepository(Pipeline) repository: Repository<Pipeline>,
    private eventEmitter: EventEmitter2,
    private itemService: PipelineItemService,
    private columnService: PipelineColumnService,
  ) {
    super(repository);
  }
  async findOwnOnePipeline(userId: string) {
    const pipeline = await this.findOneItem({
      where: {
        account: { id: userId },
      },
      relations: ['pipelineColumns', 'pipelineColumns.pipelineItems'],
    });
    return pipeline;
  }

  async updateColumns(pipelineColumns: PipelineColumn[]) {
    for (const { index, id } of pipelineColumns) {
      this.columnService.updateColumnIndex(id, { index });
    }
  }
  async updateItems(pipelineColumns: PipelineColumn[]) {
    for (const column of pipelineColumns) {
      for (const { index, id } of column.pipelineItems) {
        this.itemService.updatePipelineItemIndex(id, column.id, { index });
      }
    }
  }

  async updatePipeline(id: string, pipeline: UpdatePipelineDto) {
    reIndexPipeline(sortPipeline(pipeline));
    if (!pipeline.pipelineColumns) {
      return this.safeUpdate(id, pipeline, 'pipelineColumns');
    }

    await Promise.all([
      this.updateColumns(pipeline.pipelineColumns),
      this.updateItems(pipeline.pipelineColumns),
    ]);

    const result = await this.findOneItem({ where: { id } });

    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return result;
  }
}
