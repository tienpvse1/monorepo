import { OnEvent } from '@nestjs/event-emitter';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { Account } from '../account/entities/account.entity';

@WebSocketGateway({ namespace: 'team', cors: true })
export class TeamGateway {
  @WebSocketServer() server: Server;

  @OnEvent(InternalServerEvent.NEW_MEMBER_JOIN_TEAM)
  sendMemberJoinTeamNotification({
    teamId,
    ...rest
  }: Account & { teamId: string }) {
    this.server
      .to(teamId)
      .emit(SocketSendEvent.NEW_MEMBER_JOIN_TEAM, { ...rest });
  }

  @SubscribeMessage('join-room')
  joinSocketRoom(socket: Socket, payload: { roomId: string }) {
    const clientIp = socket.client.conn.remoteAddress;

    socket.emit('room-joined', clientIp);
  }
}
