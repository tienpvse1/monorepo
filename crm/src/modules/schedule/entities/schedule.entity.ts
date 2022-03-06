import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum ActivityType {
  TODO = 'todo',
  EMAIL = 'email',
  CALL = 'call',
  MEETING = 'meeting',
  UPLOAD_DOCUMENT = 'upload-document',
}

@Entity()
export class Schedule extends BaseEntity {
  @Column({ type: 'enum', enum: ActivityType, default: ActivityType.TODO })
  type: ActivityType;
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
}
