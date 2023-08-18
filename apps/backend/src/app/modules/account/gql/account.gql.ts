import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { Selectable } from 'kysely';
import { GraphqlDate } from '../../../common/types/graphql';
import { Account } from '../../../kysely/models';

@ObjectType()
export class AccountGql implements Omit<Selectable<Account>, 'image'> {
  @Field(() => ID)
  id: string;
  @Field(() => GraphqlDate)
  createdAt: Date;
  @Field(() => GraphqlDate)
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
  @Field()
  password: string;
  @Field(() => Boolean)
  isLeader: boolean;
  @Field(() => Int)
  teamIndex: number;
  @Field()
  teamId: string;
  @Field()
  role: string;
}
