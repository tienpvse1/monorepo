import { Optional } from '@nestjs/common';
import { IsDate, Matches } from 'class-validator';
import { Account } from 'src/modules/account/entities/account.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { ActivityTypeEnum } from '../entities/schedule.entity';

export class CreateScheduleDto {
  @Matches(
    `^${Object.values(ActivityTypeEnum)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  type: ActivityTypeEnum;
  @Optional()
  summary: string;
  @Optional()
  note: string;
  @Optional()
  isDone: boolean;
  @IsDate()
  dueDate: Date;
  accountId: string;
  pipelineItemId: string;
}
export class ParsedCreateScheduleDto {
  type: ActivityTypeEnum;
  summary: string;
  note: string;
  dueDate: Date;
  account: Account;
  pipelineItem: PipelineItem;
}
