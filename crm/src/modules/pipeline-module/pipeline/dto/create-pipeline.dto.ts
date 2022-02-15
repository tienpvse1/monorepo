import { Type } from 'class-transformer';
import { IsArray, IsOptional, Length, ValidateNested } from 'class-validator';
import { CreatePipelineColumnDto } from '../../pipeline-column/dto/create-pipeline-column.dto';

export class CreatePipelineDto {
  @Length(0)
  name: string;

  @IsArray()
  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePipelineColumnDto)
  pipelineColumns: CreatePipelineColumnDto[];
}
