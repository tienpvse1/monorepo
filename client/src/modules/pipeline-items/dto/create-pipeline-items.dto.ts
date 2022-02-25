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

export interface ICreatePipelineItemsDto {
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
  addresses?: IAddress[];
  noteWorthies?: INoteWorthy[];
}
