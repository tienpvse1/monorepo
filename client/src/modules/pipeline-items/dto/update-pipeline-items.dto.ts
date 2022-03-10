import {
  IAddress,
  INoteWorthy,
  OpportunityRevenue,
} from './create-pipeline-items.dto';

export interface IUpdatePipelineItemDto {
  name: string;
  index: number;
  columnId: string;
  expectedRevenue?: number;
  photo?: string;
  email?: string;
  phone?: string;
  priority?: number;
  expectedClosing?: string;
  internalDescription?: string;
  type?: string;
  birth?: string;
  mobile?: string;
  state?: string;
  postalCode?: string;
  taxId?: string;
  jobPosition?: string;
  website?: string;
  title?: string;
  internalNotes?: string;
  noteWorthies?: INoteWorthy[];
  opportunityRevenue?: OpportunityRevenue;
}
export interface IChangeStageDto {
  oldStageId: string;
  newStageId: string;
  index?: number;
}
