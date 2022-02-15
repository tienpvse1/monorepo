import { Role } from '@interfaces/type-roles';
import { Permission } from '@modules/permission/entity/permission.entity';

export interface IAuth {
  sessionId: string;
  publicData: {
    role: Role;
    email: string;
    id: string;
    permissions: Permission[];
  };
}
