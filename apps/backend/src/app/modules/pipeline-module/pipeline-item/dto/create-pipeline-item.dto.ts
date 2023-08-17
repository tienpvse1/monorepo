import {
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
} from 'class-validator';
import { CreateNoteWorthyDto } from '../../../note-worthy/dto/create-note-worthy.dto';
import { CreateOpportunityRevenueDto } from '../../../opportunity-revenue/dto/create-opportunity-revenue.dto';
import { OpportunityRevenue } from '../../../opportunity-revenue/entities/opportunity-revenue.entity';
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
  @IsOptional()
  contactId: string;

  @Length(10)
  @IsOptional()
  columnId: string;

  @IsNumber()
  @IsOptional()
  expectedRevenue?: number;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsOptional()
  expectedClosing?: Date;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsArray()
  noteWorthies?: CreateNoteWorthyDto[];

  opportunityRevenue: CreateOpportunityRevenueDto;
}
export class CreateSinglePipelineItemManagerDto {
  @Length(1)
  name: string;

  @Length(10)
  @IsOptional()
  accountId: string;

  @Length(10)
  contactId: string;

  @Length(10)
  columnId: string;

  @IsNumber()
  @IsOptional()
  expectedRevenue?: number;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @IsOptional()
  expectedClosing?: Date;

  @IsString()
  @IsOptional()
  description?: string;

  opportunityRevenue: CreateOpportunityRevenueDto;
}
export class ParsedCreateSinglePipelineItemDto {
  name: string;
  index: number;
  column: PipelineColumn;
  accountId: string;

  expectedClosing?: Date;
  description?: string;

  opportunityRevenue: OpportunityRevenue;

  noteWorthies?: CreateNoteWorthyDto[];
}

export class KnexCreatePipelineItemForSaleDto {
  id: string;
  account_id: string;

  contact_id: string;
  creator_id?: string;

  pipeline_column_id: string;

  name: string;
  expected_revenue?: number;
  priority?: number;
  expected_closing?: Date;
  description?: string;
}
