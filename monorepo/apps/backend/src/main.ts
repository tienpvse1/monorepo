import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import cookieParser from 'cookie-parser';
import { json } from 'express';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  app.setGlobalPrefix(config.get<string>('app.prefix'));
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(config.get<number>('app.port'));
}

bootstrap();
