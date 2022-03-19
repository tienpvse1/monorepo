import { PartialType } from '@nestjs/swagger';
import { CreateWebhookDto } from './create-webhook.dto';

export class UpdateWebhookDto extends PartialType(CreateWebhookDto) {}
