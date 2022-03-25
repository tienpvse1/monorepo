import { OnEvent } from '@nestjs/event-emitter';
import { WebSocketGateway } from '@nestjs/websockets';
import { BaseGateway } from 'src/base/base.gateway';
import { InternalServerEvent, SocketSendEvent } from 'src/constance/event';
import { reIndexColumn, sortColumns } from 'src/util/pipeline';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { PipelineColumnService } from '../pipeline-column/pipeline-column.service';

@WebSocketGateway({ cors: true, namespace: 'pipeline' })
export class PipelineGateway extends BaseGateway<any> {
  // @SubscribeMessage(SocketReceiveEvent.UPDATE_PIPELINE)
  // async handleUpdatePipeline(
  //   _client: Socket,
  //   { id, ...rest }: UpdatePipelineDto & { id: string },
  // ) {
  //   this.service.updatePipeline(id, rest);
  // }

  constructor(private service: PipelineColumnService) {
    super();
  }

  @OnEvent(InternalServerEvent.PIPELINE_UPDATED)
  async handlePipelineUpdated(payload: PipelineColumn[]) {
    if (!payload) {
      payload = await this.service.repository.find();
    }

    reIndexColumn(sortColumns(payload));
    return this.server.emit(SocketSendEvent.PIPELINE_UPDATED, {
      id: 'QIECTiuvzY',
      createdAt: '2022-02-24T10:11:45.518Z',
      updatedAt: '2022-02-24T10:12:03.000Z',
      deletedAt: null,
      name: 'pipeline 1',
      pipelineColumns: payload,
    });
  }
  @OnEvent(InternalServerEvent.PIPELINE_UPDATED)
  async handlePipelineUpdatedForManager() {
    const payload = await this.service.repository
      .createQueryBuilder('pipelineColumn')
      .leftJoinAndSelect('pipelineColumn.pipelineItems', 'pipelineItem')
      .leftJoinAndSelect('pipelineItem.account', 'account')
      .leftJoinAndSelect('pipelineItem.schedules', 'schedule')
      .getMany();

    const reindexed = sortColumns(payload);

    return this.server.emit(SocketSendEvent.MANAGER_PIPELINE_UPDATED, {
      id: 'QIECTiuvzY',
      createdAt: '2022-02-24T10:11:45.518Z',
      updatedAt: '2022-02-24T10:12:03.000Z',
      deletedAt: null,
      name: 'pipeline 1',
      pipelineColumns: reindexed,
    });
  }
}
