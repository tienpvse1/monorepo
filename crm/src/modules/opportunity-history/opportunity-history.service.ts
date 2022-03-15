import { Injectable } from '@nestjs/common';
import { CreateOpportunityHistoryDto } from './dto/create-opportunity-history.dto';
import { UpdateOpportunityHistoryDto } from './dto/update-opportunity-history.dto';

@Injectable()
export class OpportunityHistoryService {
  create(createOpportunityHistoryDto: CreateOpportunityHistoryDto) {
    return 'This action adds a new opportunityHistory';
  }

  findAll() {
    return `This action returns all opportunityHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} opportunityHistory`;
  }

  update(id: number, updateOpportunityHistoryDto: UpdateOpportunityHistoryDto) {
    return `This action updates a #${id} opportunityHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} opportunityHistory`;
  }
}
