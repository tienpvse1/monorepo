import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AccountModule } from '../account/account.module';
import { ConfigModule } from '../config/config.module';
import { SessionModule } from '../session/session.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy, JwtStrategy],
  imports: [
    SessionModule,
    AccountModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('app.secretToken'),
        signOptions: {
          expiresIn: '7d',
        },
      }),
    }),
  ],
})
export class AuthModule {}
