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



export interface OpportunityRevenue {
  productId: string;
  quantity: number;
}

export interface ICreatePipelineItemsDto {
  name: string;
  contactId: string;
  columnId: string;
  opportunityRevenue: OpportunityRevenue;
}
