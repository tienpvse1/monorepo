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

  @IsString()
  companyName: string;

  @IsArray()
  tagIds: string[];

  @IsOptional()
  @IsArray()
  noteWorthies?: CreateNoteWorthyDto[];
  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  birth: Date;

  @IsOptional()
  @IsUrl()
  photo: string;

  @IsString()
  @IsOptional()
  jobPosition: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  internalNotes: string;
}
