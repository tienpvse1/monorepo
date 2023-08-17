import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ namespace: 'team', cors: true })
export class TeamGateway {
  @WebSocketServer() server: Server;

  /**
   * list of events to implement:
   * - a new member join team
   * - team has updated
   */
}
