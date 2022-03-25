import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';

export interface IInbox extends IBase {
  subject: string;
  body: string;
  receiver: IAccount;
  sender: IContact;
}
