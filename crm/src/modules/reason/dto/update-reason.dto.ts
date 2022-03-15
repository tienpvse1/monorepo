import { PartialType } from '@nestjs/swagger';
import { CreateReasonDto } from './create-reason.dto';

export class UpdateReasonDto extends PartialType(CreateReasonDto) {}
