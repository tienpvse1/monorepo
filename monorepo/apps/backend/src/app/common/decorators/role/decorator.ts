import { SetMetadata } from '@nestjs/common';
import { Roles, ROLES_KEY } from 'src/constance';

export const HasRoles = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
