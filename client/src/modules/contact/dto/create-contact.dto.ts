import { IContact } from "../entity/contact.entity";

export interface IImportedContact {
  name: string;
  company: string;
  phone: string;
  type: string;
  email: string;
  jobPosition: string;
  address: string;
  internalNotes: string;
}
export interface CreateContactDto extends Partial<IContact> {
  companyName: string;
}
