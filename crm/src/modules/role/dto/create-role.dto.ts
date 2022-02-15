import { IsArray, Length } from 'class-validator';

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
  @Length(1)
  name: string;

  @IsArray()
  permissionIds: string[];
}
