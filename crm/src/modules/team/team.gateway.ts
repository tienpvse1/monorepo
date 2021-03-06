import { OnEvent } from '@nestjs/event-emitter';
import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BaseGateway } from 'src/base/base.gateway';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { Account } from '../account/entities/account.entity';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@WebSocketGateway({ namespace: 'team', cors: true })
export class TeamGateway extends BaseGateway<any> {
  constructor(private service: TeamService) {
    super();
  }
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
  joinSocketRoom(socket: Socket) {
    const clientIp = socket.client.conn.remoteAddress;

    socket.emit('room-joined', clientIp);
  }

  @OnEvent(InternalServerEvent.TEAM_UPDATED)
  async teamUpdated(dto: Team[]) {
    if (!dto) {
      const result = await this.service.repository.find({
        relations: ['accounts', 'accounts.role'],
      });
      return this.server.emit(SocketSendEvent.TEAM_UPDATED, result);
    }
    return this.server.emit(SocketSendEvent.TEAM_UPDATED, dto);
  }
}
