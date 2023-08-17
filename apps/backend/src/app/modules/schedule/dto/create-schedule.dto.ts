import { Optional } from '@nestjs/common';
import { Account } from 'src/modules/account/entities/account.entity';
import { ActivityType } from 'src/modules/activity-type/entities/activity-type.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';

export class CreateScheduleDto {
  @Optional()
  summary: string;
  @Optional()
  note: string;
  @Optional()
  isDone: boolean;
  dueDate: Date;
  accountId: string;
  pipelineItemId: string;
  activityTypeId: string;
}
export class ParsedCreateScheduleDto {
  activityType: ActivityType;
  summary: string;
  note: string;
  dueDate: Date;
  account: Account;
  pipelineItem: PipelineItem;
}
