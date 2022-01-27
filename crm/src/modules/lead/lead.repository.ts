import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Lead } from './entities/lead.entity';

@EntityRepository(Lead)
export class LeadRepository extends BaseRepository<Lead> {}
