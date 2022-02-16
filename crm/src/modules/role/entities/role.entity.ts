import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string;

  // many to many relation
  @ManyToMany(() => Permission, (permissions) => permissions.roles, {
    cascade: true,
  })
  permissions: Permission[];

  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
