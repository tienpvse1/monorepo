import { PartialType } from '@nestjs/swagger';
import { CreateSinglePipelineItemDto } from './create-pipeline-item.dto';

export class UpdatePipelineItemDto extends PartialType(
  CreateSinglePipelineItemDto,
) {}
