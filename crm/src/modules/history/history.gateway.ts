import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from 'src/base/base.gateway';

@WebSocketGateway({ namespace: 'history' })
export class HistoryGateway extends BaseGateway<any> {}
