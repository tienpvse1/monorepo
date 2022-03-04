import { IsArray, IsString } from 'class-validator';

export class CreateInvitationDto {
  @IsArray()
  accountIds: string[];

  @IsString()
  message: string;

  @IsString()
  senderId: string;
}
