import { OnEvent } from '@nestjs/event-emitter';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { BaseGateway } from 'src/base/base.gateway';
import {
  InternalServerEvent,
  SocketReceiveEvent,
  SocketSendEvent,
} from 'src/constance/event';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { PipelineService } from './pipeline.service';

@WebSocketGateway({ cors: true, namespace: 'pipeline' })
export class PipelineGateway extends BaseGateway<any> {
  constructor(private service: PipelineService) {
    super();
  }

  @SubscribeMessage(SocketReceiveEvent.UPDATE_PIPELINE)
  async handleUpdatePipeline(
    _client: Socket,
    { id, ...rest }: UpdatePipelineDto & { id: string },
  ) {
    this.service.updatePipeline(id, rest);
  }

  @OnEvent(InternalServerEvent.PIPELINE_UPDATED)
  async handlePipelineUpdated() {
    const pipeline = await this.service.findOneItem({});
    this.server.emit(SocketSendEvent.PIPELINE_UPDATED, pipeline);
  }
}
