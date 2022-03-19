import { OpportunityHistoryType } from '../entity/opportunity-history.entity';

export interface CreateOpportunityHistoryDto {
  description: string;
  type: OpportunityHistoryType;
  oldStageId: string;
  newStageID: string;
  pipelineItemId: string;
}
