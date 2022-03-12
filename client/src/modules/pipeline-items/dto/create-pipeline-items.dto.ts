import { IPipelineItem } from "../entity/pipeline-items.entity";

export interface IAddress {
  type: string;
  address: string;
  city: string;
  country: string;
  id: string;
}
export interface INoteWorthy {
  name: string;
  date: string;
  id: string;
}
export interface ICreatePipelineItemsDto extends Partial<IPipelineItem>{
  contactId: string;
  columnId: string;
}


