import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Env } from '../../common/types/env';
import { AccountModule } from '../account/account.module';
import { ConfigModule } from '../config/config.module';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy, AuthResolver],
  imports: [
    AccountModule,
    CacheModule.register(),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService<Env>) => ({
        secret: config.get('NEST_APP_JWT_SECRET'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
  ],
})
export class AuthModule {}
