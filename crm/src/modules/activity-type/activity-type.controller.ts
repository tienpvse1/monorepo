import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { ActivityTypeService } from './activity-type.service';
import { CreateActivityTypeDto } from './dto/create-activity-type.dto';
import { UpdateActivityTypeDto } from './dto/update-activity-type.dto';
import { ActivityType } from './entities/activity-type.entity';

@Controller('activity-type')
@Crud({
  model: {
    type: ActivityType,
  },
  dto: {
    create: CreateActivityTypeDto,
    update: UpdateActivityTypeDto,
  },
  query: {
    join: {
      schedules: {},
    },
  },
})
export class ActivityTypeController {
  constructor(readonly service: ActivityTypeService) {}
}
