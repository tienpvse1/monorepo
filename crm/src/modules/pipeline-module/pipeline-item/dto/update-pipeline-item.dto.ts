import { PartialType } from '@nestjs/swagger';
import { CreatePipelineItemDto } from './create-pipeline-item.dto';

export class UpdatePipelineItemDto extends PartialType(CreatePipelineItemDto) {}
