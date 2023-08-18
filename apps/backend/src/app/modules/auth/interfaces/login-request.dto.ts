import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, Length } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ type: 'string', format: 'email' })
  @IsEmail()
  email: string;
  @Length(6)
  @ApiProperty()
  password: string;
}
