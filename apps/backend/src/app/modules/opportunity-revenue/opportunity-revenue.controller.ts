import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
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
  query: {
    join: {
      pipelineItem: {},
      'pipelineItem.pipelineColumn': {},
      'pipelineItem.account': {},
      product: {},
    },
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
})
export class OpportunityRevenueController {
  constructor(public readonly service: OpportunityRevenueService) {}

  @Delete(':id')
  @HistoryLog('Deleted an email template')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
