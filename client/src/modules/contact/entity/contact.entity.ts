import { IBase } from '@interfaces/base';

export interface IContact extends IBase {
  name: string;
  phone: string;
  address: string;
  type: string;
  birth: string;
  email: string;
  internalNotes: string;
}
