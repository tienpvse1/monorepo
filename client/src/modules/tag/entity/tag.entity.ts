import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';

export interface ITag extends IBase {
  name: string;
  color: string;
  contacts: IContact[];
}
