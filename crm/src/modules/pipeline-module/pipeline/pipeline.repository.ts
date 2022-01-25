import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Pipeline } from './entities/pipeline.entity';

@EntityRepository(Pipeline)
export class PipelineRepository extends BaseRepository<Pipeline> {}
