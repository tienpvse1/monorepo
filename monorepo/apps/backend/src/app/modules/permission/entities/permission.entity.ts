import { BaseEntity } from 'src/base/entity.base';
import { Roles } from 'src/constance';
import { Role } from 'src/modules/role/entities/role.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
@Entity()
export class Permission extends BaseEntity {
  @Column()
  action: string;
  @Column()
  subject: string;
  @Column()
  permissionGroup: string;

  @ManyToMany(() => Role, (role) => role.permissions)
  @JoinTable({
    name: 'role_permission',
    joinColumn: { name: 'permission_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Roles[];
}
