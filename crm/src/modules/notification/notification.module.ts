import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notification } from './entities/notification.entity';
import { NotificationGateway } from './notification.gateway';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService, NotificationGateway],
  imports: [TypeOrmModule.forFeature([Notification]), AccountModule],
})
export class NotificationModule {}
