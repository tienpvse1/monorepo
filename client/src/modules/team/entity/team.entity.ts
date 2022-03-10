import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';

export interface ITeam extends IBase {
  name: string;
  index: number;
  required: number;
  accounts: IAccount[];
  createdBy: IAccount;
}
