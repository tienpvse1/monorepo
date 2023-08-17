import { PartialType } from '@nestjs/swagger';
import { CreateInboxDto } from './create-inbox.dto';

export class UpdateInboxDto extends PartialType(CreateInboxDto) {}
