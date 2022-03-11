import { Module } from '@nestjs/common';
import { PipelineColumnModule } from '../pipeline-column/pipeline-column.module';
import { PipelineItemModule } from '../pipeline-item/pipeline-item.module';
import { PipelineController } from './pipeline.controller';
import { PipelineGateway } from './pipeline.gateway';
import { PipelineService } from './pipeline.service';

@Module({
  controllers: [PipelineController],
  providers: [PipelineService, PipelineGateway],
  imports: [PipelineItemModule, PipelineColumnModule],
})
export class PipelineModule {}
