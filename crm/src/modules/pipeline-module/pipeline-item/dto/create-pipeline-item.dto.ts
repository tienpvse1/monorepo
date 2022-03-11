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
import { CreateNoteWorthyDto } from 'src/modules/note-worthy/dto/create-note-worthy.dto';
import { CreateOpportunityRevenueDto } from 'src/modules/opportunity-revenue/dto/create-opportunity-revenue.dto';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
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
  birth: Date;
  @IsOptional()
  @IsPhoneNumber('VN')
  mobile: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  state: string;
  @IsString()
  @IsOptional()
  city: string;
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

  @IsOptional()
  @IsArray()
  noteWorthies?: CreateNoteWorthyDto[];

  opportunityRevenue: CreateOpportunityRevenueDto;
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
  address: string;
  state: string;
  city: string;
  postalCode: string;
  taxId: string;
  jobPosition: string;
  website: string;
  title: string;
  internalNotes: string;
  opportunityRevenue: OpportunityRevenue;

  noteWorthies?: CreateNoteWorthyDto[];
}
