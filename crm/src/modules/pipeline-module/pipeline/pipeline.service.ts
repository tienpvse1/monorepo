import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getRepository, Repository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';

@Injectable()
export class PipelineService extends BaseService<Pipeline> {
  constructor(@InjectRepository(Pipeline) repository: Repository<Pipeline>) {
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
    if (!pipeline.pipelineColumns) {
      return this.safeUpdate(id, pipeline, 'pipelineColumns');
    }

    const columnRepository = getRepository(PipelineColumn);
    for (const column of pipeline.pipelineColumns) {
      await columnRepository.delete(column.id);
    }
    return this.safeUpdate(id, pipeline, 'pipelineColumns');
  }
}
