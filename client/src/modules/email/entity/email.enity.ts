import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface IEmail extends IBase {
  ip?: string;
  receiverEmail: string;
  body: string;
  subject: string;
  type: string;
  account: IAccount;
  isAnonymous: boolean;
}
