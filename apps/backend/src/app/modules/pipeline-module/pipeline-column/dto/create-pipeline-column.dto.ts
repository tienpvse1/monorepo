import { IsUUID, Length } from 'class-validator';

export class CreatePipelineColumnDto {
  name: string;
  @IsUUID('4')
  pipelineId: string;
}

export class CreateSinglePipelineColumnDto {
  @Length(1)
  name: string;

  @Length(10)
  pipelineId: string;
}
