import { Controller, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { User } from 'src/common/decorators/user.decorator';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
@Crud({
  model: {
    type: Notification,
  },
  dto: {
    create: CreateNotificationDto,
    update: UpdateNotificationDto,
  },
  query: {
    join: {
      receiver: {},
      sender: {},
    },
  },
})
@ApiTags('notification')
export class NotificationController {
  constructor(public service: NotificationService) {}

  @Patch('seen')
  @ApiOperation({ summary: 'seen all unseen notification in database' })
  seenAllUnseenNotification(@User('id') accountId: string) {
    return this.service.seen(accountId);
  }
}
