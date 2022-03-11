import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { Repository } from 'typeorm';
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
      const createdPipeline = this.repository.create(createPipelineDto);
      const createResult = await createdPipeline.save();
      return createResult;
    } catch (error) {
      throw new BadRequestException('cannot create');
    }
  }

  async addSingleColumn({ name }: CreateSinglePipelineColumnDto) {
    const total = await this.count();
    const columnIndex = total;

    try {
      const insertResult = await this.createItem({
        index: columnIndex,
        name,
      });

      const result = await this.find();

      this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED, result);
      return insertResult;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateColumnIndex(id: string, { index }: UpdatePipelineColumnDto) {
    return this.update(id, { index });
  }

  async getColumns() {
    return this.repository.find();
  }
}
