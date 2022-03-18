import { IBase } from '@interfaces/base';

export interface ICompany extends IBase {
  name: string;
  mobile: string;
  state: string;
  city: string;
  country: string;
  postalCode: string;
  taxId: string;
  website: string;
  type: string;
}



