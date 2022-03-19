import { IBase } from '@interfaces/base';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
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
  oldStage: IPipelineColumn;
  newStage: IPipelineColumn;
}
