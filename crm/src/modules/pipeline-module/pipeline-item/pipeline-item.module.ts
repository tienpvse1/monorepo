import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityRevenueModule } from 'src/modules/opportunity-revenue/opportunity-revenue.module';
import { PipelineItem } from './entities/pipeline-item.entity';
import { PipelineItemController } from './pipeline-item.controller';
import { PipelineItemService } from './pipeline-item.service';

@Module({
  controllers: [PipelineItemController],
  providers: [PipelineItemService],
  imports: [TypeOrmModule.forFeature([PipelineItem]), OpportunityRevenueModule],
  exports: [PipelineItemService],
})
export class PipelineItemModule {}
