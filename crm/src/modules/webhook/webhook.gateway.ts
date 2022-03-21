import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';

@WebSocketGateway({ namespace: 'webhook', cors: true })
export class WebhookGateway {
  @WebSocketServer()
  server: Server;

  @OnEvent(InternalServerEvent.WEBHOOK_SENT_EVENT)
  transactionMade(payload: any) {
    this.server.emit(SocketSendEvent.WEBHOOK_SENT_EVENT, payload);
  }
}
