import { Length } from 'class-validator';

export class CreatePermissionDto {
  @Length(1)
  action: string;
  @Length(1)
  subject: string;
  @Length(1)
  permissionGroup: string;
}
