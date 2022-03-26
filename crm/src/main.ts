import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { initializeSwagger } from './configurations/doc/swagger.doc';
import { config as AWSConfig } from 'aws-sdk';
import { json } from 'express';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  AWSConfig.update({
    accessKeyId: 'AKIAV2EHGSDBUHABCMVV',
    secretAccessKey: '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',
    region: 'ap-southeast-1',
  });
  //set the global prefix for app. eg: http://crm.com/api/v1
  app.setGlobalPrefix(config.get<string>('app.prefix'));
  app.use(cookieParser());
  app.use(json({ limit: '50mb' }));
  // app.use(compression());
  // enable cross sharing origin
  app.enableCors({
    origin: [
      'http://localhost:3000',
      'http://localhost',
      'http://localhost:3001',
      'http://165.22.59.245/',
      'http://tienpvse.fun:3000',
    ],
    credentials: true,
  });

  initializeSwagger(app, config);

  await app.listen(config.get<number>('app.port'));
}
bootstrap();
