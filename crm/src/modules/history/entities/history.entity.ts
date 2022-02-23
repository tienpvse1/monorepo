import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class History extends BaseEntity {
  @Column()
  ip: string;

  @Column({ nullable: true })
  name: string;

  @Column()
  url: string;

  @Column()
  method: string;

  @Column({ type: 'json', nullable: true })
  payload: any;

  @ManyToOne(() => Account, (account) => account.histories)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
