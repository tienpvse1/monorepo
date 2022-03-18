import { IBase } from '@interfaces/base';
import { ICompany } from '@modules/company/entity/company.entity';

export interface IContact extends IBase {
  name: string;
  birth: string;
  phone: string;
  email: string;
  photo: string;
  address: string;
  jobPosition: string;
  internalNotes: string;
  company: ICompany;
}
