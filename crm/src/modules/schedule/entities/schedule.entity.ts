import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { ActivityType } from 'src/modules/activity-type/entities/activity-type.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum ActivityTypeEnum {
  TODO = 'todo',
  EMAIL = 'email',
  CALL = 'call',
  MEETING = 'meeting',
  UPLOAD_DOCUMENT = 'upload-document',
}

@Entity()
export class Schedule extends BaseEntity {
  @Column({
    type: 'enum',
    enum: ActivityTypeEnum,
    default: ActivityTypeEnum.TODO,
  })
  type: ActivityTypeEnum;
  @Column({ nullable: true })
  summary: string;
  @Column({ type: 'datetime' })
  dueDate: Date;

  @Column({ type: 'longtext', nullable: true })
  note: string;

  @ManyToOne(() => Account, (account) => account.schedules, {
    cascade: ['insert'],
    onUpdate: 'CASCADE',
  })
  account: Account;

  @ManyToOne(() => PipelineItem, (pipelineItem) => pipelineItem.schedules, {
    cascade: ['insert'],
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  pipelineItem: PipelineItem;

  @ManyToOne(() => ActivityType, (activityType) => activityType.schedules)
  @JoinColumn({ name: 'activity_type_id' })
  activityType: ActivityType;
}
