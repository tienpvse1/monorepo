import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { Pipeline } from '../pipeline/entities/pipeline.entity';
import { PipelineRepository } from '../pipeline/pipeline.repository';
import {
  CreatePipelineColumnDto,
  CreateSinglePipelineColumnDto,
} from './dto/create-pipeline-column.dto';
import { UpdatePipelineColumnDto } from './dto/update-pipeline-column.dto';
import { PipelineColumn } from './entities/pipeline-column.entity';

@Injectable()
export class PipelineColumnService extends BaseService<PipelineColumn> {
  constructor(
    @InjectRepository(PipelineColumn)
    repository: Repository<PipelineColumn>,
    private eventEmitter: EventEmitter2,
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

  async addSingleColumn({ name, pipelineId }: CreateSinglePipelineColumnDto) {
    const pipelineRepository = getCustomRepository(PipelineRepository);
    const pipeline = await pipelineRepository.findOneItem({
      where: { id: pipelineId },
      relations: ['pipelineColumns'],
    });
    const newPipelineIndex = pipeline.pipelineColumns.length;

    try {
      const insertResult = await this.createItem({
        index: newPipelineIndex,
        name,
      });
      pipeline.pipelineColumns.push(insertResult);
      pipeline.save();
      this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
      return insertResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateColumnIndex(id: string, { index }: UpdatePipelineColumnDto) {
    return this.update(id, { index });
  }
}
