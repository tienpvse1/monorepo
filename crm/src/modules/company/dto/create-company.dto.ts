import {
  IsOptional,
  IsPhoneNumber,
  IsPostalCode,
  IsString,
  IsUrl,
} from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;
  @IsPhoneNumber('VN')
  @IsOptional()
  mobile: string;
  @IsOptional()
  @IsString()
  state: string;
  @IsOptional()
  @IsString()
  city: string;
  @IsOptional()
  @IsString()
  country: string;
  @IsOptional()
  @IsPostalCode()
  postalCode: string;
  @IsOptional()
  taxId: string;

  @IsOptional()
  @IsUrl()
  website: string;
  @IsString()
  type: string;
}
