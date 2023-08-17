import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TasksService } from './cron/cron.service';
import { KyselyModule } from './kysely';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AccountModule } from './modules/account/account.module';
import { GlobalModule } from './modules/global/global.module';
@Module({
  imports: [
    AccountModule,
    ConfigModule,
    KyselyModule.forRoot({
      databaseName: 'crm',
      host: 'localhost',
      password: 'password',
      port: 5432,
      user: 'postgres',
      camelCase: true,
    }),
  ],
  providers: [GlobalModule, TasksService],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
