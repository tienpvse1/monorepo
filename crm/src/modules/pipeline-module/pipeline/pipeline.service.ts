import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { Pipeline } from './entities/pipeline.entity';
import { PipelineRepository } from './pipeline.repository';

@Injectable()
export class PipelineService extends CRUDService<Pipeline, PipelineRepository> {
  constructor(
    @InjectRepository(PipelineRepository) repository: PipelineRepository,
  ) {
    super(repository);
  }
}
