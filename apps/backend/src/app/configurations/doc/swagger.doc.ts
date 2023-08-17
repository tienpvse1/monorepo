import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';

export const initializeSwagger = (
  app: INestApplication,
  configService: ConfigService,
) => {
  const config = new DocumentBuilder()
    .setTitle('CRM Api')
    .setDescription('The CRM API description')
    .setVersion(configService.get<string>('app.version'))
    .addBearerAuth(
      {
        type: 'http',
        in: 'header',
        name: AUTHORIZATION,
      },
      AUTHORIZATION,
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
