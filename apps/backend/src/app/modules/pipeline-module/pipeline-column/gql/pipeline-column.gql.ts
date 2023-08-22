import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphqlDate } from 'apps/backend/src/app/common/types';
import { PipelineColumn } from 'apps/backend/src/app/kysely/models';
import { Selectable } from 'kysely';

@ObjectType()
export class PipelineColumnGql implements Selectable<PipelineColumn> {
  @Field(() => ID)
  id: string;
  @Field(() => GraphqlDate, { nullable: true })
  createdAt: Date;
  @Field(() => GraphqlDate, { nullable: true })
  updatedAt: Date;
  @Field()
  name: string;
  @Field()
  isWon: boolean;
  @Field()
  pipelineId: string;
  @Field({ nullable: true })
  deletedAt: Date;
  @Field({ defaultValue: 0 })
  index: number;
}
