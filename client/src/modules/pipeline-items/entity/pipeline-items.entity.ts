import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { IAddress, INoteWorthy } from '../dto/create-pipeline-items.dto';

export interface IPipelineItem extends IBase {
  name: string;
  index: number;
  pipelineColumn: IPipelineColumn;
  expectedRevenue?: number;
  photo?: string;
  email?: string;
  phone?: string;
  priority?: number;
  expectedClosing?: string;
  internalDescription?: string;
  type?: string;
  birth?: string;
  mobile?: string;
  state?: string;
  postalCode?: string;
  taxId?: string;
  jobPosition?: string;
  website?: string;
  title?: string;
  internalNotes?: string;
  addresses?: IAddress[];
  noteWorthies?: INoteWorthy[];
  account: IAccount;
  contact: IContact;
}
