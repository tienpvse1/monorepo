import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

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
  pipelineColumnId: string;

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

  @IsUUID('4')
  pipelineColumnId: string;
}
export class ParsedCreateSinglePipelineItemDto {
  name: string;
  index: number;
  accountId: string;

  expectedClosing?: Date;
  description?: string;
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
