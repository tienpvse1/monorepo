import { Field, InputType, ObjectType } from '@nestjs/graphql';

@InputType()
export class RegisterDto {
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field({ nullable: true })
  teamId?: string;
}
