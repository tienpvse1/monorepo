import { PartialType } from '@nestjs/swagger';
import { CreateOpportunityRevenueDto } from './create-opportunity-revenue.dto';

export class UpdateOpportunityRevenueDto extends PartialType(CreateOpportunityRevenueDto) {}
