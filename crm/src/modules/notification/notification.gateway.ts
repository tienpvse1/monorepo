import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InternalServerEvent } from 'src/constance/event';
import { AccountService } from '../account/account.service';
import { InternalSendNotificationPayload } from './dto/internal-send-notification.dto';
// import { NotificationService } from './notification.service';

@WebSocketGateway()
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    // private service: NotificationService,
    private accountService: AccountService,
  ) {}

  @OnEvent(InternalServerEvent.SEND_NOTIFICATION)
  async handleSendNotification({
    receiverId,
    ...rest
  }: InternalSendNotificationPayload) {
    const account = await this.accountService.repository
      .createQueryBuilder('account')
      .where('account.id = :id', { id: receiverId })
      .leftJoinAndSelect('account.session', 'session')
      .getOne();
    this.server.emit(account.session.notificationId, { rest });
  }
}
