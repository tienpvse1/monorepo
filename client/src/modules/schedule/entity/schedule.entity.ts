import { IAccount } from '@interfaces/account';
import { IBase } from '@interfaces/base';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

export interface ISchedule extends IBase {
  type: string;
  summary: string;
  note: string;
  dueDate: string;
  account: IAccount;
  pipelineItem: IPipelineItem;
  isDone: boolean;
}
