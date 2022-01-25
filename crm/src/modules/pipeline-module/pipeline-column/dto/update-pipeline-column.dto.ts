import { PartialType } from '@nestjs/swagger';
import { CreatePipelineColumnDto } from './create-pipeline-column.dto';

export class UpdatePipelineColumnDto extends PartialType(CreatePipelineColumnDto) {}
