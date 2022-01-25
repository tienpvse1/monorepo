import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './configurations/doc/swagger.doc';
import * as cookieParser from 'cookie-parser';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  //set the global prefix for app. eg: http://crm.com/api/v1
  app.setGlobalPrefix(config.get<string>('app.prefix'));
  app.use(cookieParser());
  // enable cross sharing origin
  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });
  initializeSwagger(app, config);

  await app.listen(config.get<number>('app.port'));
}
bootstrap();
