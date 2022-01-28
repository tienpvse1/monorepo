import { IsArray, IsPhoneNumber, MinLength } from 'class-validator';

export class CreateContactDto {
  @MinLength(2)
  name: string;
  @MinLength(20)
  address?: string;
  @IsPhoneNumber('VN')
  phone?: string;
  @IsArray()
  type?: string[];
}
