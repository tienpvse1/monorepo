import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookGateway } from './webhook.gateway';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, WebhookGateway],
})
export class WebhookModule {}
