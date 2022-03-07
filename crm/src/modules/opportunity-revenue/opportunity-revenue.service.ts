import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { OpportunityRevenue } from './entities/opportunity-revenue.entity';

@Injectable()
export class OpportunityRevenueService extends BaseService<OpportunityRevenue> {
  constructor(
    @InjectRepository(OpportunityRevenue)
    repository: Repository<OpportunityRevenue>,
  ) {
    super(repository);
  }
}
