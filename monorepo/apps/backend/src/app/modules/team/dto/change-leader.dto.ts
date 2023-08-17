import { IsUUID } from 'class-validator';

export class ChangeLeaderDto {
  @IsUUID('4')
  accountId: string;
  @IsUUID('4')
  id: string;
}
