import { Field, InputType } from '@nestjs/graphql';
import { IsUUID, Length } from 'class-validator';

@InputType()
export class CreatePipelineColumnDto {
  @Field()
  name: string;
  @Field()
  @IsUUID('4')
  pipelineId: string;
}

export class CreateSinglePipelineColumnDto {
  @Length(1)
  name: string;

  @Length(10)
  pipelineId: string;
}
