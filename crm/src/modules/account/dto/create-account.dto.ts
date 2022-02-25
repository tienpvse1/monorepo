import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsPostalCode,
  IsString,
  Length,
} from 'class-validator';

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
  @IsOptional()
  @IsString()
  @Length(1)
  city?: string;
  @IsOptional()
  @IsPostalCode('any')
  zipCode?: string;
  @IsOptional()
  @IsString()
  @Length(1)
  state?: string;
  @IsOptional()
  @IsString()
  @Length(1)
  country?: string;
}
