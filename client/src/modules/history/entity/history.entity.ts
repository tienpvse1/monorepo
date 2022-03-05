import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface IHistory extends IBase {
  ip: string;
  name: string;
  url: string;
  method: string;
  payload: any;
  account: IAccount;
}
