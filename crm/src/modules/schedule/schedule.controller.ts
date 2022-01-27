import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';
import { ScheduleService } from './schedule.service';

@Controller('schedule')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('schedule')
export class ScheduleController extends BaseController<
  Schedule,
  CreateScheduleDto,
  UpdateScheduleDto,
  ScheduleRepository,
  ScheduleService
> {
  constructor(readonly service: ScheduleService) {
    super(service);
  }

  @Post()
  override create(@Body() createDto: CreateScheduleDto): Promise<Schedule> {
    return this.service.create(createDto);
  }

  @Patch('id')
  override update(
    @Param('id') id: string,
    @Body() updateDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    return this.service.update(id, updateDto);
  }
}
