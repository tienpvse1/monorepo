import { Optional } from '@nestjs/common';
import { IsDate, Matches } from 'class-validator';
import { Account } from 'src/modules/account/entities/account.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { ActivityType } from '../entities/schedule.entity';

export class CreateScheduleDto {
  @Matches(
    `^${Object.values(ActivityType)
      .filter((v) => typeof v !== 'number')
      .join('|')}$`,
    'i',
  )
  type: ActivityType;
  @Optional()
  summary: string;
  @Optional()
  note: string;
  @IsDate()
  dueDate: Date;
  accountId: string;
  pipelineItemId: string;
}
export class ParsedCreateScheduleDto {
  type: ActivityType;
  summary: string;
  note: string;
  dueDate: Date;
  account: Account;
  pipelineItem: PipelineItem;
}
