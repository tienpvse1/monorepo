import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { InternalServerEvent } from 'src/constance/event';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository, getRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { ActivityType } from '../activity-type/entities/activity-type.entity';
import { InternalSendNotificationPayload } from '../notification/dto/internal-send-notification.dto';
import { PipelineItemRepository } from '../pipeline-module/pipeline-item/pipeline-item.repository';
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
  constructor(
    public readonly service: ScheduleService,
    private eventEmitter: EventEmitter2,
  ) {}

  @Post()
  @ApiBody({ type: CreateScheduleDto })
  @HistoryLog('scheduled an activity')
  // @UsePipes(ParseDtoPipe)
  async createSchedule(
    @Body() dto: CreateScheduleDto,
    @User('id') userId: string,
  ) {
    const accountRepository = getCustomRepository(AccountRepository);
    const activityTypeRepository = getRepository(ActivityType);
    const { accountId, pipelineItemId, activityTypeId, ...rest } = dto;
    const pipelineItemRepository = getCustomRepository(PipelineItemRepository);
    const account = await accountRepository.findOne({
      where: { id: accountId },
    });
    const activityType = await activityTypeRepository.findOne({
      where: { id: activityTypeId },
    });
    const pipelineItem = await pipelineItemRepository.findOne({
      where: { id: pipelineItemId },
    });
    const parsedDto = {
      ...rest,
      account,
      pipelineItem,
      activityType,
    };
    if (userId !== parsedDto.account.id) {
      const accountRepository = getCustomRepository(AccountRepository);

      const account = await accountRepository.findOne({
        where: { id: userId },
      });
      const payload: InternalSendNotificationPayload = {
        description: `${account.firstName} ${account.lastName} scheduled you an activity`,
        receiverId: parsedDto.account.id,
        name: 'Scheduled Activity',
        senderId: userId,
      };
      this.eventEmitter.emit(InternalServerEvent.SEND_NOTIFICATION, payload);
    }
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
