import { IsNumber, Length, Min } from 'class-validator';

export class CreatePipelineColumnDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(1)
  index: number;
  pipelineId: string;
}
