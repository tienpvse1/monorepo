import { IBase } from '@interfaces/base';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export enum OpportunityHistoryType {
  CREATE = 'create',
  CHANGE_STATE = 'change-state',
  UPDATE = 'update',
  DELETE = 'delete',
}
export interface IOpportunityHistory extends IBase {
  description: string;
  type: OpportunityHistoryType;
  pipelineItem: IPipelineItem;
}
