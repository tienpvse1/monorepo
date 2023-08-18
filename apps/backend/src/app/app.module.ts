import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { KyselyModule } from './kysely';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';
import { RoleGuard } from './modules/auth/guard/role.guard';
import { TeamModule } from './modules/team/team.module';
@Module({
  imports: [
    TeamModule,
    AuthModule,
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
    }),
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
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
  controllers: [],
})
export class AppModule {}
