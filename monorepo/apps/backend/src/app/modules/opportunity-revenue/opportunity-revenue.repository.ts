import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { OpportunityRevenue } from './entities/opportunity-revenue.entity';

@EntityRepository(OpportunityRevenue)
export class OpportunityRevenueRepository extends BaseRepository<OpportunityRevenue> {}
