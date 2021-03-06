import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { AccountService } from '../account/account.service';
import { WebHookDto } from '../webhook/dto/create-webhook.dto';
import { InternalSendNotificationPayload } from './dto/internal-send-notification.dto';
import { NotificationService } from './notification.service';
// import { NotificationService } from './notification.service';

@WebSocketGateway({ namespace: 'notification', cors: true })
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    // private service: NotificationService,
    private accountService: AccountService,
    private service: NotificationService,
  ) {}

  @OnEvent(InternalServerEvent.SEND_NOTIFICATION)
  async handleSendNotification({
    receiverId,
    ...rest
  }: InternalSendNotificationPayload) {
    const [receiver, sender] = await Promise.all([
      this.accountService.repository
        .createQueryBuilder('account')
        .where('account.id = :id', { id: receiverId })
        .leftJoinAndSelect('account.session', 'session')
        .getOne(),
      this.accountService.repository
        .createQueryBuilder('account')
        .where('account.id = :id', { id: rest.senderId })
        .getOne(),
    ]);
    const notification = await this.service.repository
      .create({
        receiver,
        sender,
        name: rest.name,
        description: rest.description,
      })
      .save();

    this.service.repository.create({});
    if (receiver.session)
      this.server
        .to(receiver.session.notificationId)
        .emit(SocketSendEvent.SEND_NOTIFICATION, notification);
  }

  @OnEvent(InternalServerEvent.WEBHOOK_SENT_EVENT)
  async transactionMade(payload: WebHookDto) {
    const account = await this.accountService.findOneWithoutError({
      where: {
        username: payload.to.value[0].address,
      },
      relations: ['session'],
    });

    if (!account) return;
    if (!account.session) return;

    this.server
      .to(account.session.notificationId)
      .emit(SocketSendEvent.WEBHOOK_SENT_EVENT, payload);
  }

  @OnEvent(InternalServerEvent.WEBHOOK_SENT_TEST_EVENT)
  async testNotification(payload: any) {
    this.server.emit(SocketSendEvent.WEBHOOK_SENT_TEST_EVENT, payload);
  }
}
