import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from '../../common/decorators/user.decorator';
import { AccountService } from './account.service';
import { JoinTeamDto } from './dto/create-account.dto';
import { AccountGql } from './gql/account.gql';

@Resolver(() => AccountGql)
export class AccountResolver {
  constructor(private readonly service: AccountService) {}

  @Query(() => AccountGql)
  me(@User('id') userId: string) {
    return this.service.findOne(userId);
  }

  @Mutation(() => AccountGql, { nullable: true })
  joinTeam(
    @User('id', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Args('input') { teamId }: JoinTeamDto
  ) {
    return this.service.joinTeam(userId, teamId);
  }
}
