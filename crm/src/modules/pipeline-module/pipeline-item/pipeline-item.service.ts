import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { PipelineItem } from './entities/pipeline-item.entity';
import { PipelineItemRepository } from './pipeline-item.repository';

@Injectable()
export class PipelineItemService extends CRUDService<
  PipelineItem,
  PipelineItemRepository
> {
  constructor(
    @InjectRepository(PipelineItemRepository)
    repository: PipelineItemRepository,
  ) {
    super(repository);
  }
}
