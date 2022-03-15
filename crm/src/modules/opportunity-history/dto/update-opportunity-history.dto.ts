import { PartialType } from '@nestjs/swagger';
import { CreateOpportunityHistoryDto } from './create-opportunity-history.dto';

export class UpdateOpportunityHistoryDto extends PartialType(CreateOpportunityHistoryDto) {}
