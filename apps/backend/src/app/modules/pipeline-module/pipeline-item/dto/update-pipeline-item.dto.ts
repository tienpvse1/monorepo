import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/swagger';
import { CreateSinglePipelineItemDto } from './create-pipeline-item.dto';

export class UpdatePipelineItemDto extends PartialType(
  CreateSinglePipelineItemDto
) {}

@InputType()
export class ChangeStageDto {
  @Field()
  pipelineItemId: string;
  @Field()
  oldColumnId: string;
  @Field()
  newColumnId: string;
  @Field()
  topIndex: number;
  @Field()
  bottomIndex: number;
}

export class KnexAssignCode {
  discount_code_id: string;
  id: string;
}

export class UpdatePipelineItemIndexDto {
  oldStageId: string;
  newStageId: string;
  topIndex: number;
  bottomIndex: number;
}
