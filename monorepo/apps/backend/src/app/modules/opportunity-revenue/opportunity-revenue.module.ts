import { Module } from '@nestjs/common';
import { OpportunityRevenueService } from './opportunity-revenue.service';
import { OpportunityRevenueController } from './opportunity-revenue.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpportunityRevenue } from './entities/opportunity-revenue.entity';

@Module({
  controllers: [OpportunityRevenueController],
  providers: [OpportunityRevenueService],
  imports: [TypeOrmModule.forFeature([OpportunityRevenue])],
  exports: [OpportunityRevenueService],
})
export class OpportunityRevenueModule {}
