import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { IGoogleUser } from '../interfaces/user.google';
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
  constructor(config: ConfigService) {
    super({
      clientID: config.get<string>('google.id'),
      clientSecret: config.get<string>('google.secret'),
      callbackURL: config.get<string>('google.redirectURL'),
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ): Promise<IGoogleUser> {
    const { emails, photos, name } = profile;
    const user = {
      firstName: name.givenName,
      lastName: name.familyName,
      email: emails[0].value,
      photo: photos[0].value,
      accessToken,
    };
    done(null, user);
    return user;
  }
}
