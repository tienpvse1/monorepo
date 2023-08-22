import { Field, ObjectType } from '@nestjs/graphql';
import { PipelineItem } from 'apps/backend/src/app/kysely/models';
import { Selectable } from 'kysely';

@ObjectType()
export class PipelineItemGql implements Selectable<PipelineItem> {
  @Field()
  id: string;
  @Field({ nullable: true })
  createdAt: Date;
  @Field({ nullable: true })
  updatedAt: Date;
  @Field()
  name: string;
  @Field()
  index: number;
  @Field({ nullable: true })
  priority: number;
  @Field({ nullable: true })
  expectedClosing: Date;
  @Field({ nullable: true })
  expectedRevenue: number;
  @Field({ nullable: true })
  description: string;
  @Field()
  lost: boolean;
  @Field({ nullable: true })
  contactId: string;
  @Field({ nullable: true })
  pipelineColumnId: string;
  @Field({ nullable: true })
  deletedAt: Date;
  @Field({ nullable: true })
  createdById: string;
}
