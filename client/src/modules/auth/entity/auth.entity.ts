import { Role } from '@interfaces/type-roles';
import { Permission } from '@modules/permission/entity/permission.entity';

export interface IAuth {
  sessionId: string;
  publicData: {
    role: {
      name: Role;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date;
      id: string;
    };
    email: string;
    id: string;
    permissions: Permission[];
  };
}
