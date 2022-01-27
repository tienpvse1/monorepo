import { Optional } from '@nestjs/common';
import { IsDate, Matches } from 'class-validator';
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
}
