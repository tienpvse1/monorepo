import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateContactDto {
  @MinLength(2)
  name: string;
  @MinLength(5)
  @IsOptional()
  address?: string;
  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;
  @IsString()
  type?: string;
}
