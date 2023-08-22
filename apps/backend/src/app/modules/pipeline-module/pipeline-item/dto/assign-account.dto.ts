import { Field, InputType } from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()
export class AssignAccountToOpportunityDto {
  @Field()
  @IsUUID('4')
  id: string;
  @Field()
  @IsUUID('4')
  accountId: string;
}
