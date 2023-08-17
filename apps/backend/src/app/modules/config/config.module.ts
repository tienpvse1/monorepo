import { Global, Module } from '@nestjs/common';
import { ConfigModule as RootConfigModule } from '@nestjs/config';
import { appConfig } from './config.env';

@Global()
@Module({
  imports: [
    RootConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
  ],
})
export class ConfigModule {}
