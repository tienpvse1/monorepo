import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import {
  CreateScheduleDto,
  ParsedCreateScheduleDto,
} from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ParseDtoPipe } from './parse-dto.pipe';
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
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    exclude: ['createOneBase'],
  },
})
export class ScheduleController {
  constructor(public readonly service: ScheduleService) {}

  @Post()
  @ApiBody({ type: CreateScheduleDto })
  @UsePipes(ParseDtoPipe)
  createSchedule(@Body() parsedDto: ParsedCreateScheduleDto) {
    return this.service.createItem(parsedDto);
  }
}
