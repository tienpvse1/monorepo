import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BaseGateway } from 'src/base/base.gateway';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { getConnection } from 'typeorm';
import { Socket } from '../socket/entities/socket.entity';
import { Invitation } from './entities/invitation.entity';

@WebSocketGateway(80, { namespace: 'invitation', cors: true })
export class InvitationGateway extends BaseGateway<any> {
  @WebSocketServer() server: Server;

  @OnEvent(InternalServerEvent.INVITATION_SENT)
  async joinTeamInvitation(payload: Invitation) {
    const { receivers, ...invitation } = payload;
    for (const { id } of receivers) {
      const sockets = await getConnection()
        .getRepository(Socket)
        .createQueryBuilder('socket')
        .select('socket.id')
        .where('socket.account_id = :id', { id })
        .getMany();
      for (const { id: socketId } of sockets) {
        this.server
          .to(socketId)
          .emit(SocketSendEvent.INVITATION_SENT, { invitation });
      }
    }
  }
}
