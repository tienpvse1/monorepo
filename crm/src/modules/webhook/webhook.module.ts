import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { WebhookGateway } from './webhook.gateway';
import { AccountModule } from '../account/account.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [WebhookController],
  providers: [WebhookService, WebhookGateway],
  imports: [NotificationModule, AccountModule],
})
export class WebhookModule {}
