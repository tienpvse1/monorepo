import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { Response } from 'express';
import { getIp } from 'src/util/ip';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { SessionService } from '../session/session.service';
import { LoginRequestDto } from './interfaces/login-request.dto';
import { IToken } from './interfaces/token.interface';
import { IGoogleUser } from './interfaces/user.google';
@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private config: ConfigService,
    private sessionService: SessionService,
  ) {}

  // binding isSocialAccount field with true value to mark this account use social login method
  // password will not be required to be created
  setSocialAccount(account: unknown) {
    Object.assign(account, { isSocialAccount: true });
  }

  getAccount = async (email: string) => {
    const account = await this.accountService.findOne({
      where: { email },
      select: [
        'email',
        'password',
        'id',
        'role',
        'firstName',
        'lastName',
        'isSocialAccount',
      ],
    });
    return account;
  };

  generateJWTToken(account: Account) {
    const { email, id, firstName, lastName, role } = account;
    const tokenPayload: Partial<IToken> = {
      subject: id,
      payload: {
        email,
        firstName,
        id,
        lastName,
        role,
      },
    };

    return this.jwtService.sign(tokenPayload);
  }

  // create account if not exist in database
  // based on email
  async findOrCreateAccount(user: IGoogleUser, response: Response) {
    const { accessToken, ...rest } = user;
    const account = await this.accountService.findOneWithoutError({
      where: {
        email: rest.email,
      },
    });
    // mark this as an social account(google, facebook,etc..)
    // this case it's google account
    this.setSocialAccount(rest);

    // if account haven't exist in database, save it
    if (!account) {
      const newAccount = await this.accountService.createItem(rest);
      response.cookie('token', this.generateJWTToken(newAccount));
      response.redirect(this.config.get<string>('google.frontendUrl'));
      return;
    }
    // else grab the account in database
    response.cookie('token', this.generateJWTToken(account));
    response.redirect(this.config.get<string>('google.frontendUrl'));
    return;
  }

  // deprecated
  async loginByEmailPassword(
    { email, password }: LoginRequestDto,
    response: Response,
  ) {
    try {
      const account = await this.getAccount(email);

      if (!account.password)
        throw new UnauthorizedException(
          'account already registered with google login method',
        );
      const checkPasswordResult = compareSync(password, account.password);

      if (!checkPasswordResult)
        throw new UnauthorizedException('Check your password');
      response.cookie('token', this.generateJWTToken(account));
      response.status(HttpStatus.OK).json({
        data: {
          token: this.generateJWTToken(account),
          publicData: {
            role: account.role,
            email: account.email,
            id: account.id,
          },
        },
        message: 'successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
      });
    }
  }

  async loginUsingSession(
    { email, password }: LoginRequestDto,
    ip: string,
    response: Response,
  ) {
    const account = await this.getAccount(email);

    try {
      if (!account.password)
        throw new UnauthorizedException(
          'account already registered with google login method',
        );
      const checkPasswordResult = compareSync(password, account.password);

      if (!checkPasswordResult)
        throw new UnauthorizedException('Check your password');

      const sessionFromAccountId =
        await this.sessionService.getSessionByAccountId(account.id);

      if (sessionFromAccountId) {
        const session = await this.sessionService.updateSession(
          sessionFromAccountId.id,
          getIp(ip),
        );
        response.cookie('sessionId', session.id);
        return response.status(HttpStatus.OK).json({
          data: {
            sessionId: session.id,
            publicData: {
              role: account.role,
              email: account.email,
              id: account.id,
            },
          },
          message: 'successfully',
          statusCode: HttpStatus.OK,
        });
      }

      const session = await this.sessionService.create({
        accountId: account.id,
        role: account.role,
        ip: getIp(ip),
      });
      response.cookie('sessionId', session.id);
      response.status(HttpStatus.OK).json({
        data: {
          sessionId: session.id,
          publicData: {
            role: account.role,
            email: account.email,
            id: account.id,
          },
        },
        message: 'successfully',
        statusCode: HttpStatus.OK,
      });
    } catch (error) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        message: error.message,
        statusCode: HttpStatus.UNAUTHORIZED,
        timestamp: new Date().toISOString(),
      });
    }
  }
}
