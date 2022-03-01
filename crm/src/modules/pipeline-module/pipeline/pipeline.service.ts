import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { reIndexPipeline, sortPipeline } from 'src/util/pipeline';
import { getRepository, Repository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';

@Injectable()
export class PipelineService extends BaseService<Pipeline> {
  constructor(
    @InjectRepository(Pipeline) repository: Repository<Pipeline>,
    private eventEmitter: EventEmitter2,
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

  async updatePipeline(id: string, pipeline: UpdatePipelineDto) {
    reIndexPipeline(sortPipeline(pipeline));
    if (!pipeline.pipelineColumns) {
      return this.safeUpdate(id, pipeline, 'pipelineColumns');
    }

    const columnRepository = getRepository(PipelineColumn);
    for (const column of pipeline.pipelineColumns) {
      await columnRepository.delete(column.id);
    }
    const result = await this.safeUpdate(id, pipeline, 'pipelineColumns');
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED, result);
    return result;
  }
}
