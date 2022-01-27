import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
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

  @ManyToOne(() => Account, (account) => account.schedules)
  account: Account;
}
