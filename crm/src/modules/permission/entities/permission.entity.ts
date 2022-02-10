import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Account } from 'src/modules/account/entities/account.entity';
@Entity()
export class Permission extends BaseEntity {
  @Column()
  action: string;
  @Column()
  subject: string;
  @Column()
  permissionGroup: string;

  @ManyToMany(() => Account, (account) => account.permissions)
  @JoinTable({
    name: 'account_permission',
    joinColumn: { name: 'permission_id' },
    inverseJoinColumn: { name: 'account_id' },
  })
  accounts: Account[];
}
