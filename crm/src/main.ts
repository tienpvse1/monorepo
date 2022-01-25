import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeSwagger } from './configurations/doc/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  //set the global prefix for app. eg: http://crm.com/api/v1
  app.setGlobalPrefix(config.get<string>('app.prefix'));

  // enable cross sharing origin
  app.enableCors();
  initializeSwagger(app, config);

  await app.listen(config.get<number>('app.port'));
}
bootstrap();
