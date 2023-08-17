import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { PipelineColumn } from './entities/pipeline-column.entity';

@EntityRepository(PipelineColumn)
export class PipelineColumnRepository extends BaseRepository<PipelineColumn> {}
