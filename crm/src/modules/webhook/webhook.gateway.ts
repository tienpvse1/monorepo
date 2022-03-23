import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'webhook', cors: true })
export class WebhookGateway {
  @WebSocketServer()
  server: Server;
}
