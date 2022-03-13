import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface ISession extends IBase {
  ip: string;
  account: IAccount;
  notificationId: string;
  expiredAt: string;
}
