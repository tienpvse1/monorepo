import { IsString, Length } from 'class-validator';

export class CreateNotificationDto {
  @Length(10)
  senderId: string;
  @Length(10)
  receiverId: string;
  @IsString()
  name: string;
  @IsString()
  description: string;
}
