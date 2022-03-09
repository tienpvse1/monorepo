import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from 'src/base/base.gateway';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { reIndexPipeline, sortPipeline } from 'src/util/pipeline';
import { PipelineService } from './pipeline.service';

@WebSocketGateway({ cors: true, namespace: 'pipeline' })
export class PipelineGateway extends BaseGateway<any> {
  constructor(private service: PipelineService) {
    super();
  }

  // @SubscribeMessage(SocketReceiveEvent.UPDATE_PIPELINE)
  // async handleUpdatePipeline(
  //   _client: Socket,
  //   { id, ...rest }: UpdatePipelineDto & { id: string },
  // ) {
  //   this.service.updatePipeline(id, rest);
  // }

  @OnEvent(InternalServerEvent.PIPELINE_UPDATED)
  async handlePipelineUpdated(payload: { accountId: string }) {
    const pipeline = await this.service.findOwnOnePipeline(payload.accountId);
    reIndexPipeline(sortPipeline(pipeline));
    this.server.emit(SocketSendEvent.PIPELINE_UPDATED, pipeline);
  }
}
