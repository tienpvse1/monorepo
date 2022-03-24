import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface IEmail extends IBase {
  ip?: any;
  receiverEmail: string;
  body: string;
  subject: string;
  type: string;
  account: IAccount;
}
