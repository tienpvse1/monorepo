import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';
import { IProvinces } from '@modules/provinces/entity/provinces.entity';

export type CompanySource =
  | 'Twitter'
  | 'Phone'
  | 'Youtube'
  | 'Facebook'
  | 'Instagram'
  | 'DirectMeeting'
  | 'Presenter'
  | 'Advertisement'
  | 'Other';
export interface ICompany extends IBase {
  name: string;
  email: string;
  address: string;
  mobile: string;
  state: string;
  city: IProvinces;
  country: string;
  postalCode: string;
  taxId: string;
  website: string;
  type: string;
  contacts?: IContact[];
  foundationDate: any;
  source: CompanySource;
  creator: IAccount;
}
