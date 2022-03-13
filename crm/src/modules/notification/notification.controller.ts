import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
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
})
export class NotificationController {
  constructor(public service: NotificationService) {}
}
