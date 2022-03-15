import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Permission } from 'src/modules/permission/entities/permission.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

export enum RoleType {
  ADMIN = 'admin',
  SALE = 'sale',
  SALE_MANAGE = 'sale_manager',
  ACCOUNTANT = 'accountant',
}
@Entity()
export class Role extends BaseEntity {
  @Column({ type: 'enum', enum: RoleType, default: RoleType.SALE })
  name: RoleType;

  // many to many relation
  @ManyToMany(() => Permission, (permissions) => permissions.roles, {
    cascade: true,
  })
  permissions: Permission[];

  @OneToMany(() => Account, (account) => account.role)
  accounts: Account[];
}
