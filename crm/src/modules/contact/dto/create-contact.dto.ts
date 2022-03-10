import {
  IsArray,
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { CreateNoteWorthyDto } from 'src/modules/note-worthy/dto/create-note-worthy.dto';

export class CreateContactDto {
  @MinLength(2)
  name: string;

  @IsOptional()
  @IsArray()
  noteWorthies?: CreateNoteWorthyDto[];
  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;
  @IsString()
  @IsOptional()
  type?: string;
  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  birth: Date;
  @IsOptional()
  @IsPhoneNumber('VN')
  mobile: string;
  @IsOptional()
  @IsUrl()
  photo: string;
  @IsString()
  @IsOptional()
  state: string;
  @IsString()
  @IsOptional()
  postalCode: string;
  @IsString()
  @IsOptional()
  taxId: string;
  @IsString()
  @IsOptional()
  jobPosition: string;
  @IsUrl()
  @IsOptional()
  website: string;
  @IsString()
  @IsOptional()
  title: string;
  @IsString()
  @IsOptional()
  internalNotes: string;
}
