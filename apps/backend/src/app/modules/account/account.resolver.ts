import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { randomUUID } from 'crypto';
import { Public } from '../../common/decorators/public.decorator';
import { User } from '../../common/decorators/user.decorator';
import { AccountService } from './account.service';
import { JoinTeamDto } from './dto/create-account.dto';
import { AccountGql } from './gql/account.gql';

@Resolver(() => AccountGql)
export class AccountResolver {
  constructor(private readonly service: AccountService) {}

  @Public()
  @Query(() => AccountGql, { nullable: true })
  hello(): AccountGql {
    return {
      active: true,
      createdAt: new Date(),
      email: 'tienpvse',
      firstName: 'tienpvse',
      id: randomUUID(),
      isLeader: false,
      lastName: 'phan',
      password: 'ajsfdoasdikfj',
      role: 'admin',
      teamId: randomUUID(),
      teamIndex: 1,
      updatedAt: new Date(),
      username: 'tienpvse',
    };
  }

  @Mutation(() => AccountGql, { nullable: true })
  joinTeam(
    @User('id', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Args('input') { teamId }: JoinTeamDto
  ) {
    return this.service.joinTeam(userId, teamId);
  }
}
