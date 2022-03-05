import { IContact } from '../entity/contact.entity';
export interface UpdateContactDto extends Partial<IContact> {}
