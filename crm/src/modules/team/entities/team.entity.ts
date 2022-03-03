import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Team extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Account, (account) => account.team, { cascade: true })
  accounts: Account[];
}
