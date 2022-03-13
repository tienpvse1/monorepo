import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { generateExpireDate } from 'src/util/check-expire';
import { BeforeInsert, Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'session' })
export class Session extends BaseEntity {
  @Column()
  ip: string;

  @Column({ nullable: true, name: 'notification_id' })
  notificationId: string;
  @Column({ name: 'expired_at' })
  expiredAt: Date;

  @OneToOne(() => Account, (account) => account.session)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @BeforeInsert()
  init() {
    this.id = nanoid(10);
    this.expiredAt = generateExpireDate();
  }
}
