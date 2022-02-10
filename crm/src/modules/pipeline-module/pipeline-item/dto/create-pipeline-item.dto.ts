import { IsNumber, Length, Min } from 'class-validator';

export class CreatePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(1)
  index: number;

  @Length(5)
  pipelineColumnId: string;
}
