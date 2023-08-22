import { Module } from '@nestjs/common';
import { PipelineItemResolver } from './pipeline-item.resolver';
import { PipelineItemService } from './pipeline-item.service';

@Module({
  providers: [PipelineItemService, PipelineItemResolver],
  exports: [PipelineItemService],
})
export class PipelineItemModule {}
