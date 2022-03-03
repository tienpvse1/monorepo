import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { CreateAddressDto } from 'src/modules/address/dto/create-address.dto';
import { AddressTypes } from 'src/modules/address/entities/address.entity';
import { CreateNoteWorthyDto } from 'src/modules/note-worthy/dto/create-note-worthy.dto';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

export class CreatePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;
}
export class CreateSinglePipelineItemDto {
  @Length(1)
  name: string;

  @Length(10)
  contactId: string;

  @Length(10)
  columnId: string;

  @IsNumber()
  @IsOptional()
  expectedRevenue?: number;

  @IsUrl()
  @IsOptional()
  photo?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @Matches(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    { message: 'end date is invalid' },
  )
  @IsOptional()
  expectedClosing?: Date;

  @IsString()
  @IsOptional()
  internalDescription?: string;

  @IsString()
  @IsOptional()
  type?: AddressTypes;

  @IsString()
  @IsOptional()
  birth: Date;
  @IsOptional()
  @IsPhoneNumber('VN')
  mobile: string;

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

  @IsArray()
  addresses?: CreateAddressDto[];
  @IsOptional()
  @IsArray()
  noteWorthies?: CreateNoteWorthyDto[];
}
export class ParsedCreateSinglePipelineItemDto {
  name: string;
  index: number;
  column: PipelineColumn;

  expectedRevenue?: number;
  photo?: string;
  email?: string;
  phone?: string;
  priority?: number;
  expectedClosing?: Date;
  internalDescription?: string;
  type?: string;

  birth: Date;
  mobile: string;
  state: string;
  postalCode: string;
  taxId: string;
  jobPosition: string;
  website: string;
  title: string;
  internalNotes: string;

  addresses?: CreateAddressDto[];
  noteWorthies?: CreateNoteWorthyDto[];
}
