import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';

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
  contacts?: IContact[];
}



