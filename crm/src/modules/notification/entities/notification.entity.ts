import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;
  @ManyToOne(() => Account, (account) => account.sentNotifications)
  sender: Account;

  @ManyToOne(() => Account, (account) => account.inboxNotifications)
  receiver: Account;
}
