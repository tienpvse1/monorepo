import { IsEmail, Length } from 'class-validator';

export class CreateMailerDto {
  @Length(1)
  subject: string;
  @IsEmail()
  to: string;
  @Length(1)
  value: string;
}
