import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { BaseGateway } from 'src/base/base.gateway';
import { InternalServerEvent } from 'src/constance/event';
import { Invitation } from './entities/invitation.entity';

@WebSocketGateway({ namespace: 'invitation', cors: true })
export class InvitationGateway extends BaseGateway<any> {
  @WebSocketServer() server: Server;

  @OnEvent(InternalServerEvent.INVITATION_SENT)
  async joinTeamInvitation(payload: Invitation) {}
}
