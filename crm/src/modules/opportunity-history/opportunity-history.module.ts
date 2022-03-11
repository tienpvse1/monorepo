import { Module } from '@nestjs/common';
import { OpportunityHistoryService } from './opportunity-history.service';
import { OpportunityHistoryController } from './opportunity-history.controller';

@Module({
  controllers: [OpportunityHistoryController],
  providers: [OpportunityHistoryService]
})
export class OpportunityHistoryModule {}
