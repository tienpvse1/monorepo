import { PartialType } from '@nestjs/swagger';
import { WebHookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends PartialType(WebHookDto) {}
