import { IsArray, IsEnum, Length } from 'class-validator';
import { RoleType } from '../entities/role.entity';

export class CreateRoleDto {
  @Length(1)
  name: string;
}

export class AssignRoleDto {
  @Length(1)
  id: string;

  @Length(1)
  accountId: string;
}

export class AddPermissionDto {
  @IsEnum(RoleType)
  name: RoleType;

  @IsArray()
  permissionIds: string[];
}
