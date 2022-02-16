import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getRepository, Repository } from 'typeorm';
import { Pipeline } from '../pipeline/entities/pipeline.entity';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
import { PipelineColumn } from './entities/pipeline-column.entity';

@Injectable()
export class PipelineColumnService extends BaseService<PipelineColumn> {
  constructor(
    @InjectRepository(PipelineColumn)
    repository: Repository<PipelineColumn>,
  ) {
    super(repository);
  }

  async addColumn(
    pipelineId: string,
    createPipelineDto: CreatePipelineColumnDto,
  ) {
    try {
      const pipelineRepository = getRepository(Pipeline);
      const pipeline = await pipelineRepository.findOne(pipelineId);

      const createdPipeline = this.repository.create(createPipelineDto);
      createdPipeline.pipeline = pipeline;
      const createResult = await createdPipeline.save();
      return createResult;
    } catch (error) {
      throw new BadRequestException('cannot create');
    }
  }
}
