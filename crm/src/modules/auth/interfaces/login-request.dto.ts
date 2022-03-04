import { IsEmail, IsOptional, Length } from 'class-validator';

export class LoginRequestDto {
  @IsEmail()
  email: string;
  @Length(6)
  password: string;
  @IsOptional()
  socketId: string;
}
