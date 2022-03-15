import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OpportunityHistoryService } from './opportunity-history.service';
import { CreateOpportunityHistoryDto } from './dto/create-opportunity-history.dto';
import { UpdateOpportunityHistoryDto } from './dto/update-opportunity-history.dto';

@Controller('opportunity-history')
export class OpportunityHistoryController {
  constructor(
    private readonly opportunityHistoryService: OpportunityHistoryService,
  ) {}

  @Post()
  create(@Body() createOpportunityHistoryDto: CreateOpportunityHistoryDto) {
    return this.opportunityHistoryService.create(createOpportunityHistoryDto);
  }

  @Get()
  findAll() {
    return this.opportunityHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.opportunityHistoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOpportunityHistoryDto: UpdateOpportunityHistoryDto,
  ) {
    return this.opportunityHistoryService.update(
      +id,
      updateOpportunityHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.opportunityHistoryService.remove(+id);
  }
}
