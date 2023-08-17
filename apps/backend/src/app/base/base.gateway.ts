import { SubscribeMessage, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketSendEvent, SocketReceiveEvent } from 'src/constance/event';

export class BaseGateway<PayloadType> {
  @WebSocketServer()
  protected server: Server;

  @SubscribeMessage(SocketReceiveEvent.JOIN)
  async joinRoom(client: Socket, payload: PayloadType & { roomId: string }) {
    client.join(payload.roomId);
    this.server
      .to(payload.roomId)
      .emit(SocketSendEvent.JOINED, { message: 'new member joined the room' });
  }
}
