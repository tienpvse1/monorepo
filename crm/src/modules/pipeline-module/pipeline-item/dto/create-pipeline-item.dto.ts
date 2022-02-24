import { IsNumber, Length, Min } from 'class-validator';
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
  @IsNumber()
  @Min(0)
  index: number;
  @Length(10)
  columnId: string;
}
export class ParsedCreateSinglePipelineItemDto {
  name: string;
  index: number;
  column: PipelineColumn;
}
