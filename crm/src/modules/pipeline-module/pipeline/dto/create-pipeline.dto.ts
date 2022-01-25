import { Length } from 'class-validator';

export class CreatePipelineDto {
  @Length(0)
  name: string;
}
