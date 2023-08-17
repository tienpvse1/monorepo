import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ACCESS_TOKEN_KEY } from '../../../constant';
import { IToken } from '../interfaces/token.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const data = request?.cookies[ACCESS_TOKEN_KEY];
          return data;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('app.secretToken'),
    });
  }

  async validate(token: IToken) {
    return token.payload;
  }
}
