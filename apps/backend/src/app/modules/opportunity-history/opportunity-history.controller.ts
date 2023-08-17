import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateOpportunityHistoryDto } from './dto/create-opportunity-history.dto';
import { UpdateOpportunityHistoryDto } from './dto/update-opportunity-history.dto';
import { OpportunityHistory } from './entities/opportunity-history.entity';
import { OpportunityHistoryService } from './opportunity-history.service';

@Controller('opportunity-history')
@ApiTags('opportunity history')
@Crud({
  model: {
    type: OpportunityHistory,
  },
  dto: {
    create: CreateOpportunityHistoryDto,
    update: UpdateOpportunityHistoryDto,
  },
  routes: {
    exclude: ['createOneBase', 'deleteOneBase'],
  },
  query: {
    join: {
      oldStage: {},
      newStage: {},
      pipelineItem: {},
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
export class OpportunityHistoryController {
  constructor(private readonly service: OpportunityHistoryService) {}

  @Post()
  create(@Body() createOpportunityHistoryDto: CreateOpportunityHistoryDto) {
    return this.service.create(createOpportunityHistoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
