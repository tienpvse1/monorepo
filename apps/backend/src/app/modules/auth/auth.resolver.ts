import {
  Args,
  Context,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { InjectKysely, Kysely } from '../../kysely';
import { AccountGql } from '../account/gql/account.gql';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterDto } from './dto/register.dto';
import { AuthGql } from './gql/auth.gql';

@Resolver(() => AuthGql)
@Public()
export class AuthResolver {
  constructor(
    @InjectKysely private readonly kysely: Kysely,
    private readonly service: AuthService
  ) {}

  @Mutation(() => AuthGql)
  register(@Args('input') input: RegisterDto, @Context('req') req: Request) {
    return this.service.register(input, req);
  }

  @Mutation(() => AuthGql)
  login(@Args('input') input: LoginRequestDto, @Context('req') req: Request) {
    return this.service.loginWithEmailPassword(
      input.email,
      input.password,
      req
    );
  }

  @ResolveField(() => AccountGql)
  async account(@Parent() { accountId }: AuthGql) {
    return this.kysely
      .selectFrom('account')
      .where('id', '=', accountId)
      .selectAll()
      .executeTakeFirst();
  }
}
