import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum EmailType {
  SEND = 'send',
  RECEIVE = 'receive',
}
@Entity({ name: 'email' })
export class Email extends BaseEntity {
  @Column()
  ip: string;

  @Column({ name: 'receiver_email' })
  receiverEmail: string;

  @Column({ name: 'email_body', type: 'longtext' })
  body: string;

  @Column()
  subject: string;

  @Column({
    name: 'email_type',
    type: 'enum',
    enum: EmailType,
    default: EmailType.SEND,
  })
  type: EmailType;

  @ManyToOne(() => Account, (account) => account.emails)
  account: Account;
}
