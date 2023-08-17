import { Module } from '@nestjs/common';
import { OpportunityHistoryService } from './opportunity-history.service';
import { OpportunityHistoryController } from './opportunity-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityHistory } from './entities/opportunity-history.entity';
import { PipelineItemModule } from '../pipeline-module/pipeline-item/pipeline-item.module';
import { PipelineColumnModule } from '../pipeline-module/pipeline-column/pipeline-column.module';

@Module({
  controllers: [OpportunityHistoryController],
  providers: [OpportunityHistoryService],
  imports: [
    TypeOrmModule.forFeature([OpportunityHistory]),
    PipelineItemModule,
    PipelineColumnModule,
  ],
})
export class OpportunityHistoryModule {}
