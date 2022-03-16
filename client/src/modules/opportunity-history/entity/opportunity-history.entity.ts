import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export enum OpportunityHistoryType {
  CREATE = 'create',
  CHANGE_STATE = 'change-state',
  UPDATE = 'update',
  DELETE = 'delete',
}
export interface IOpportunityHistory {
  description: string;
  type: OpportunityHistoryType;
  pipelineItem: IPipelineItem;
}
