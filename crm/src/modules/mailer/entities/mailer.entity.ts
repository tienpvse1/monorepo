import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'email' })
export class Email extends BaseEntity {
  @Column()
  ip: string;
  @Column()
  receiverEmail: string;

  @ManyToOne(() => Account, (account) => account.emails)
  account: Account;
}
