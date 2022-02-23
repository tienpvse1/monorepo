import { IBase } from '@interfaces/base';

export interface Contact extends IBase {
  name: string;
  phone: string;
  address: string;
  type: string;
  birth: string;
  email: string;
}
