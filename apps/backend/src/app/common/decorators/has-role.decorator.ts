import { SetMetadata } from '@nestjs/common';
import { ROLES_KEY, Roles } from '../../constant';

export const HasRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
