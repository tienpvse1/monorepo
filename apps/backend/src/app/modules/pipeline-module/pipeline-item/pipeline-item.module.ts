import { Module } from '@nestjs/common';
import { PipelineItemController } from './pipeline-item.controller';
import { PipelineItemService } from './pipeline-item.service';

@Module({
  controllers: [PipelineItemController],
  providers: [PipelineItemService],
  exports: [PipelineItemService],
})
export class PipelineItemModule {}
