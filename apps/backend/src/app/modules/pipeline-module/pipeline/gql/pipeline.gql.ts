import { Field, ID, ObjectType } from '@nestjs/graphql';
import { GraphqlDate } from 'apps/backend/src/app/common/types';
import { Pipeline } from 'apps/backend/src/app/kysely/models';
import { Selectable } from 'kysely';

@ObjectType()
export class PipelineGql implements Selectable<Pipeline> {
  @Field(() => ID)
  id: string;
  @Field(() => GraphqlDate)
  createdAt: Date;
  @Field(() => GraphqlDate, { nullable: true })
  updatedAt: Date;
  @Field()
  name: string;
  @Field({ nullable: true })
  teamId: string;
  @Field({ nullable: true })
  accountId: string;
  @Field({ nullable: true })
  description: string;
  @Field({ nullable: true })
  deletedAt: Date;
}
