import { Module } from '@nestjs/common';
import { AccountModule } from 'src/modules/account/account.module';
import { PipelineColumnModule } from '../pipeline-column/pipeline-column.module';
import { PipelineItemModule } from '../pipeline-item/pipeline-item.module';
import { PipelineController } from './pipeline.controller';
import { PipelineGateway } from './pipeline.gateway';
import { PipelineService } from './pipeline.service';

@Module({
  controllers: [PipelineController],
  providers: [PipelineService, PipelineGateway],
  imports: [PipelineItemModule, PipelineColumnModule, AccountModule],
})
export class PipelineModule {}
