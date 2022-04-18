import { IAccount } from '@interfaces/account';
import { Design } from 'react-email-editor';
import { EmailTemplateType } from '../dto/create-aet.dto';

export interface IAET {
  account: IAccount;
  html: string;
  design: Design;
  type: EmailTemplateType;
}
