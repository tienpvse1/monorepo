import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface INotification extends IBase {
  name: string;
  description: string;
  seen: boolean;
  receiver: IAccount;
  sender: IAccount;
}
