import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './common/filter/exception.filter';
import { KyselyModule } from './kysely';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { GlobalModule } from './modules/global/global.module';
@Module({
  imports: [
    AuthModule,
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    KyselyModule.forRoot({
      databaseName: 'crm',
      host: 'localhost',
      password: 'password',
      port: 5432,
      user: 'postgres',
      camelCase: true,
    }),
  ],
  providers: [
    // GlobalModule,
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
  ],
  controllers: [],
})
export class AppModule {}
