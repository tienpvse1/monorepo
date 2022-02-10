import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('schedule')
@Crud({
  model: {
    type: Schedule,
  },
  dto: {
    create: CreateScheduleDto,
    update: UpdateScheduleDto,
  },
})
export class ScheduleController {
  constructor(public readonly service: ScheduleService) {}
}
