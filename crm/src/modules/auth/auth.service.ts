import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare, compareSync, hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getIp } from 'src/util/ip';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { Session } from '../session/entities/session.entity';
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
      select: ['email', 'password', 'id', 'role', 'firstName', 'lastName'],
    });
    return account;
  };

  getAccountForAuth = async (email: string, password: string) => {
    const account = await this.accountService.findOne({
      where: { email },
      select: [
        'email',
        'password',
        'id',
        'role',
        'firstName',
        'lastName',
        'photo',
      ],
      relations: ['role', 'role.permissions'],
    });
    // throw exception if account does not found
    if (!account) {
      throw new UnauthorizedException("account doesn't exist");
    }

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
    const account = await this.accountService.repository
      .createQueryBuilder()
      .where({
        email: rest.email,
      })
      .getOne();
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

  // !deprecated
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

  sendResult(req: Request, session: Session, account: Account) {
    req.res.cookie('sessionId', session.id, { httpOnly: true });
    return {
      sessionId: session.id,
      publicData: {
        role: account.role,
        email: account.email,
        id: account.id,
        photo: account.photo,
        firstName: account.firstName,
        lastName: account.lastName,
      },
    };
  }

  async loginUsingSession(
    { email, password }: LoginRequestDto,
    ip: string,
    req: Request,
  ) {
    const account = await this.getAccountForAuth(email, password);
    try {
      const [isPasswordMatch, sessionFromAccountId] = await Promise.all([
        compare(password, account.password),
        this.sessionService.repository
          .createQueryBuilder('session')
          .where('session.account_id = :accountId', { accountId: account.id })
          .getOne(),
      ]);
      if (!isPasswordMatch)
        throw new BadRequestException('check your password');
      // if the session is exist and still valid, update it only

      if (sessionFromAccountId) {
        const session = await this.sessionService.updateSession(
          sessionFromAccountId.id,
          getIp(ip),
        );
        return this.sendResult(req, session, account);
      }

      const [newPassword, session] = await Promise.all([
        hash(password, 10),
        this.sessionService.create({
          account: account,
          ip: getIp(ip),
        }),
      ]);
      // saving session to account
      account.session = session;
      account.password = newPassword;
      await account.save();
      return this.sendResult(req, session, account);
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  async logout(rawIp: string, req: Request) {
    const sessionId = req.cookies['sessionId'];
    const ip = getIp(rawIp);
    const session = await this.sessionService.findOne({
      where: { id: sessionId, ip: ip },
    });
    if (!session) throw new BadRequestException('cannot logout');
    await this.sessionService.permanentDelete(sessionId);
    req.res.clearCookie('public_user_info');
    req.res.clearCookie('sessionId');
    return { message: 'logged out successfully' };
  }
}
