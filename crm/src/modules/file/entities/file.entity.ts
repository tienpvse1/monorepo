import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity()
export class File extends BaseEntity {
  @Column()
  url: string;
  @Column()
  name: string;

  @OneToOne(() => Account, (account) => account.file)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
