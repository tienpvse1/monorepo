import { IBase } from '@interfaces/base';

export interface IContact extends IBase {
  name: string;
  noteWorthies: NoteWorthy[];
  phone: string;
  type: string;
  email: string;
  birth: string | any;
  mobile: string;
  photo: string;
  state: string;
  postalCode: string;
  taxId: string;
  jobPosition: string;
  website: string;
  title: string;
  prefixMobile: string;
  internalNotes: string;
  address: string;
}
export interface Address extends IBase{
	type: string;
	address: string;
	city: string;
	country: string;
}

export interface NoteWorthy {
	name: string;
	date: string;
}
