import { IBase } from '@interfaces/base';

export interface IContact extends IBase {
  name: string;
  addresses: Address[];
  noteWorthies: NoteWorthy[];
  phone: string;
  type: string;
  email: string;
  birth: string;
  mobile: string;
  photo: string;
  state: string;
  postalCode: string;
  taxId: string;
  jobPosition: string;
  website: string;
  title: string;
  internalNotes: string;
}
export interface Address {
	type: string;
	address: string;
	city: string;
	country: string;
}

export interface NoteWorthy {
	name: string;
	date: string;
}
