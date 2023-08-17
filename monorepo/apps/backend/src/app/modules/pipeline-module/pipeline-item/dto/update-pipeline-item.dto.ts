import { PartialType } from '@nestjs/swagger';
import { CreateSinglePipelineItemDto } from './create-pipeline-item.dto';

export class UpdatePipelineItemDto extends PartialType(
  CreateSinglePipelineItemDto
) {}

export class ChangeStageDto {
  oldStageId: string;
  newStageId: string;
  topIndex: number;
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
