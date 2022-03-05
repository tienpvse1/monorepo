import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateOpportunityRevenueDto } from './dto/create-opportunity-revenue.dto';
import { UpdateOpportunityRevenueDto } from './dto/update-opportunity-revenue.dto';
import { OpportunityRevenue } from './entities/opportunity-revenue.entity';
import { OpportunityRevenueService } from './opportunity-revenue.service';

@Controller('opportunity-revenue')
@ApiTags('opportunity revenue')
@Crud({
  model: {
    type: OpportunityRevenue,
  },
  dto: {
    create: CreateOpportunityRevenueDto,
    update: UpdateOpportunityRevenueDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  query: {},
})
export class OpportunityRevenueController {
  constructor(public readonly service: OpportunityRevenueService) {}
}
