import { Field, InputType } from '@nestjs/graphql';
import { IsNumber, IsUUID, Length, Min } from 'class-validator';

export class CreatePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;
}

@InputType()
export class CreateSinglePipelineItemDto {
  @Field()
  name: string;

  @Field()
  contactId: string;

  @Field()
  @IsUUID('4')
  pipelineColumnId: string;

  @Field({ nullable: true })
  expectedRevenue?: number;

  @Field({ nullable: true })
  priority?: number;

  @Field({ nullable: true })
  expectedClosing?: Date;

  @Field({ nullable: true })
  description?: string;
}

@InputType()
export class CreateSinglePipelineItemManagerDto extends CreateSinglePipelineItemDto {
  @Field()
  @IsUUID('4')
  accountId: string;
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
