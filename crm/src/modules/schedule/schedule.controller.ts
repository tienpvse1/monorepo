import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
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
    exclude: ['createOneBase', 'deleteOneBase', 'updateOneBase'],
    updateOneBase: {
      decorators: [HistoryLog('updated an scheduled activity')],
    },
  },
  query: {
    join: {
      account: {},
      pipelineItem: {},
    },
  },
})
export class ScheduleController {
  constructor(public readonly service: ScheduleService) {}

  @Post()
  @ApiBody({ type: CreateScheduleDto })
  @HistoryLog('scheduled an activity')
  @UsePipes(ParseDtoPipe)
  createSchedule(@Body() parsedDto: ParsedCreateScheduleDto) {
    return this.service.createItem(parsedDto);
  }

  @Delete(':id')
  @HistoryLog('Deleted an activity')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Patch(':id')
  updateSchedule(@Param('id') id: string, @Body() dto: UpdateScheduleDto) {
    return this.service.update(id, dto);
  }
}
