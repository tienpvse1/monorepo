import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { PipelineItem } from './entities/pipeline-item.entity';

@EntityRepository(PipelineItem)
export class PipelineItemRepository extends BaseRepository<PipelineItem> {}
