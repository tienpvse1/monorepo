import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
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
}
