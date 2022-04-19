import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { IContact } from '@modules/contact/entity/contact.entity';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { ISchedule } from '@modules/schedule/entity/schedule.entity';
import { INoteWorthy } from '../dto/create-pipeline-items.dto';
import { CourseData, IProduct } from '@modules/product/entity/product.entity';
import { IReason } from '@modules/reason/entity/reason.entity';

export interface IPipelineItem extends IBase {
  name: string;
  index: number;
  pipelineColumn: IPipelineColumn;
  expectedRevenue?: number;
  photo?: string;
  email?: string;
  phone?: string;
  priority?: number;
  expectedClosing?: string | any;
  description?: string;
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
  noteWorthies?: INoteWorthy[];
  account: IAccount;
  contact: IContact;
  schedules: ISchedule[];
  opportunityRevenue: IOpportunityRevenue;
  isLose: boolean;
  reason: IReason;
}

export interface IOpportunityRevenue {
  quantity?: number;
  product?: IProduct;
  productId?: string;
  courseId?: string;
  course?: CourseData;
}
