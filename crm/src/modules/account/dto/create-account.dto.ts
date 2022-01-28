import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class CreateAccountDto {
  @Length(2, 100)
  @IsOptional()
  firstName: string;
  @Length(2, 100)
  @IsOptional()
  lastName: string;
  @IsEmail()
  email: string;
  @Length(6, 50)
  // @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
  //   message:
  //     'password must have minimum eight characters, at least one letter, one number and one special character',
  // })
  password: string;
  @ApiProperty({
    description: 'image url',
  })
  @IsOptional()
  photo: string;
}
