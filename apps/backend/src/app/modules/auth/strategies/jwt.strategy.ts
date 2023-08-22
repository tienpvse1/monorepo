import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Env } from '../../../common/types/env';
import { ACCESS_TOKEN_KEY } from '../../../constant';
import { IToken } from '../dto/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService<Env>) {
    const extractors = [cookiesExtractor, headerExtractor];
    super({
      jwtFromRequest: ExtractJwt.fromExtractors(extractors),
      ignoreExpiration: false,
      secretOrKey: config.get('NEST_APP_JWT_SECRET'),
    });
  }

  async validate(token: IToken) {
    return token.payload;
  }
}

function cookiesExtractor(req: Request) {
  return req.cookies[ACCESS_TOKEN_KEY];
}

function headerExtractor(req: Request) {
  return req.headers.authorization?.replace('Bearer ', '');
}
