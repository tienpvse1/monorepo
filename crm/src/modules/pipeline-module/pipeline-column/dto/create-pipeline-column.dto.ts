import { Type } from 'class-transformer';
import {
  IsArray,
  IsNumber,
  IsOptional,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreatePipelineItemDto } from '../../pipeline-item/dto/create-pipeline-item.dto';

export class CreatePipelineColumnDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => CreatePipelineItemDto)
  pipelineItems: CreatePipelineItemDto[];
}
