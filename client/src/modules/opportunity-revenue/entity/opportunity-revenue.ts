import { IBase } from '@interfaces/base';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export interface IOpportunityRevenue extends IBase {
  quantity: number;
  courseId: string;
  pipelineItem: IPipelineItem;
}
