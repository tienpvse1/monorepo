import { resolve } from '@monorepo/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcryptjs';
import { Cache } from 'cache-manager';
import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { Selectable } from 'kysely';
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../constant';
import { Account } from '../../kysely/models';
import { AccountService } from '../account/account.service';
import { RegisterDto } from './dto/register.dto';
import { IToken } from './dto/token.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER) private cache: Cache,
    private accountService: AccountService,
    private jwtService: JwtService
  ) {}

  generateJWTToken(account: Partial<Selectable<Account>>, expiresIn = '3m') {
    const { email, id, firstName, lastName, role } = account;
    const tokenPayload: Partial<IToken> = {
      subject: id,
      payload: { email, firstName, id, lastName, role },
    };
    return this.jwtService.sign(tokenPayload, { expiresIn });
  }

  async register(dto: RegisterDto, req: Request) {
    const password = await this.hashPassword(dto.password);

    const createAccountFn = this.accountService.create({ ...dto, password });
    const [account, error] = await resolve(createAccountFn);
    if (error) throw new BadRequestException('cannot create account');
    return this.loginWithEmailPassword(account.email, dto.password, req, {
      skipPasswordCheck: true,
    });
  }

  async loginWithEmailPassword(
    email: string,
    password: string,
    request: Request,
    options?: { skipPasswordCheck: boolean }
  ) {
    // refresh token will has ttl of 10 days
    const refreshTokenTtl = 10 * 24 * 60 * 60;
    const findAccountFn = this.accountService.findOneByEmail(email);
    const [account, error] = await resolve(findAccountFn);
    if (error || !account)
      throw new NotFoundException(`cannot find account with email ${email}`);
    if (!options?.skipPasswordCheck)
      await this.comparePassword(password, account.password);
    const accessToken = this.generateJWTToken(account);
    const refreshToken = this.generateJWTToken(account, '10d');
    this.cache.set(account.id, refreshToken, refreshTokenTtl);
    this.setCookie(ACCESS_TOKEN_KEY, request.res, accessToken);
    this.setCookie(
      REFRESH_TOKEN_KEY,
      request.res,
      refreshToken,
      refreshTokenTtl
    );
    return { accessToken, refreshToken, accountId: account.id };
  }

  private hashPassword(password: string) {
    return hash(password, 10);
  }

  /**
   *
   * @param response express response object
   * @param token what ever kind of token in string data type
   * @param expires expires time in **second**
   */
  private setCookie(
    key: string,
    response: Response,
    token: string,
    expires = 3 * 60
  ) {
    response.cookie(key, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: dayjs(new Date()).add(expires, 'second').toDate(),
    });
  }

  private async comparePassword(password: string, hashedPassword: string) {
    const isValid = await compare(password, hashedPassword);
    if (!isValid) throw new UnauthorizedException('bad credential');
  }
}
