import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { PipelineColumn } from './entities/pipeline-column.entity';
import { PipelineColumnRepository } from './pipeline-column.repository';

@Injectable()
export class PipelineColumnService extends CRUDService<
  PipelineColumn,
  PipelineColumnRepository
> {
  constructor(
    @InjectRepository(PipelineColumnRepository)
    repository: PipelineColumnRepository,
  ) {
    super(repository);
  }
}
