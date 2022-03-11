import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Team extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'int', name: 'team_index' })
  index: number;

  @Column({ type: 'int', default: '10' })
  required: number;

  @ManyToOne(() => Account, (account) => account.createdTeams)
  @JoinColumn({ name: 'account_id' })
  createdBy: Account;

  @OneToMany(() => Account, (account) => account.team, { cascade: true })
  accounts: Account[];
}
