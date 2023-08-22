import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Selectable } from 'kysely';
import { GraphqlDate } from '../../../common/types/graphql';
import { Account } from '../../../kysely/models';

@ObjectType()
export class AccountGql
  implements Omit<Selectable<Account>, 'image' | 'password'>
{
  @Field(() => ID)
  id: string;
  @Field(() => GraphqlDate, { nullable: true })
  createdAt: Date;
  @Field(() => GraphqlDate, { nullable: true })
  updatedAt: Date;
  @Field()
  username: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field(() => Boolean)
  active: boolean;
  @Field()
  email: string;
  @Field(() => Boolean)
  isLeader: boolean;
  @Field(() => Int, { nullable: true })
  teamIndex: number;
  @Field({ nullable: true })
  teamId: string;
  @Field()
  role: string;
}
