import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
  Length,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;
  @IsOptional()
  @IsEmail()
  email: string;
  @Length(10)
  cityId: string;
  @IsPhoneNumber('VN')
  @IsOptional()
  mobile: string;
  @IsOptional()
  @IsString()
  state: string;
  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  foundationDate: Date;

  @IsOptional()
  @IsString()
  source: string;

  @IsOptional()
  @IsString()
  country: string;
  @IsOptional()
  @IsPostalCode('any')
  postalCode: string;
  @IsOptional()
  taxId: string;

  @IsOptional()
  @IsUrl()
  website: string;
  @IsString()
  type: string;
}
