import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import { AppModule } from './app/app.module';
import { Env } from './app/common/types/env';
import { initializeSwagger } from './app/configurations/doc/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService<Env>);
  app.setGlobalPrefix(config.getOrThrow('NEST_APP_PREFIX'));
  initializeSwagger(app, config);
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(config.get<number>('NEST_APP_PORT'));
}

bootstrap();
