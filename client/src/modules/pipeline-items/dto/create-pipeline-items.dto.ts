export interface IAddress {
  type: string;
  address: string;
  city: string;
  country: string;
}

export interface INoteWorthy {
  name: string;
  date: string;
}

export interface ICreatePipelineItem {
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
