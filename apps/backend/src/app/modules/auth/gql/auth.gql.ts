import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthGql {
  @Field()
  accessToken: string;
  @Field()
  refreshToken: string;
  @Field()
  accountId: string;
}
