import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class History extends BaseEntity {
  @Column()
  ip: string;

  @Column()
  name: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @ManyToOne(() => Account, (account) => account.histories)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
