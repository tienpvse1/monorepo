import { PartialType } from '@nestjs/swagger';
import { CreateActivityTypeDto } from './create-activity-type.dto';

export class UpdateActivityTypeDto extends PartialType(CreateActivityTypeDto) {}
