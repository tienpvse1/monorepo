import { PartialType } from '@nestjs/swagger';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';
import { CreatePipelineDto } from './create-pipeline.dto';

export class UpdatePipelineDto extends PartialType(CreatePipelineDto) {
  override pipelineColumns?: PipelineColumn[];
}
