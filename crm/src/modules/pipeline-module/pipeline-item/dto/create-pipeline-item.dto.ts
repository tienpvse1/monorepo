import { IsNumber, Length, Min } from 'class-validator';

export class CreatePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;
}
