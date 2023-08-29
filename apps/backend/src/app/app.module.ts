import { YogaDriver, YogaDriverConfig } from '@graphql-yoga/nestjs';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import 'dotenv/config';
import { KyselyModule } from './kysely';
import { AccountModule } from './modules/account/account.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt.guard';
import { RoleGuard } from './modules/auth/guard/role.guard';
import { PipelineItemModule } from './modules/pipeline-module/pipeline-item/pipeline-item.module';
import { TeamModule } from './modules/team/team.module';
@Module({
  imports: [
    TeamModule,
    AuthModule,
    AccountModule,
    PipelineItemModule,
    ConfigModule.forRoot({ isGlobal: true }),
    GraphQLModule.forRoot<YogaDriverConfig>({
      driver: YogaDriver,
      autoSchemaFile: true,
    }),
    KyselyModule.forRoot({
      databaseName: process.env.NEST_APP_DATABASE_DB,
      host: process.env.NEST_APP_DATABASE_HOST,
      password: process.env.NEST_APP_DATABASE_PASS,
      port: parseInt(process.env.NEST_APP_DATABASE_PORT),
      user: process.env.NEST_APP_DATABASE_USER,
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
