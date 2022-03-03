import { PartialType } from '@nestjs/swagger';
import { CreateSocketDto } from './create-socket.dto';

export class UpdateSocketDto extends PartialType(CreateSocketDto) {}
