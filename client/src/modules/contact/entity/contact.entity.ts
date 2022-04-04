import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { ICompany } from '@modules/company/entity/company.entity';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { ITag } from '@modules/tag/entity/tag.entity';

export interface IContact extends IBase {
  name: string;
  account: IAccount;
  pipelineItems: IPipelineItem[];
  birth: string | any;
  phone: string;
  email: string;
  photo: string;
  address: string;
  jobPosition: string;
  internalNotes: string;
  company: ICompany;
  tags: ITag[];
}
