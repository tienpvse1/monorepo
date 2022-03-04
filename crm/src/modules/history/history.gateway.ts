import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from 'src/base/base.gateway';

@WebSocketGateway(80, { namespace: 'history' })
export class HistoryGateway extends BaseGateway<any> {}
