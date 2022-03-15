import { IPipelineItem } from '../entity/pipeline-items.entity';

export interface INoteWorthy {
  name: string;
  date: string;
  id: string;
}

export interface OpportunityRevenue {
  productId: string;
  quantity: number;
}
export interface IUpdatePipelineItemDto extends Partial<IPipelineItem>{
}
export interface IChangeStageDto {
  oldStageId: string;
  newStageId: string;
  index?: number;
}

export interface IUpdateExpectedClosing {
  expectedClosing: string;
  id: string;
}
