import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Env } from '../../common/types/env';
import { AUTHORIZATION } from '../../constant';

export const initializeSwagger = (
  app: INestApplication,
  configService: ConfigService<Env>
) => {
  const config = new DocumentBuilder()
    .setTitle('Api document')
    .setVersion(configService.get('NEST_APP_VERSION'))
    .addBearerAuth(
      { type: 'http', in: 'header', name: AUTHORIZATION },
      AUTHORIZATION
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/docs', app, document);
};
