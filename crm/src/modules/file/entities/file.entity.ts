import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column()
  url: string;
  @Column()
  name: string;

  @ManyToOne(() => Account, (account) => account.files)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
