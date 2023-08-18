import { Module } from '@nestjs/common';
import { PipelineColumnController } from './pipeline-column.controller';
import { PipelineColumnService } from './pipeline-column.service';

@Module({
  controllers: [PipelineColumnController],
  providers: [PipelineColumnService],
})
export class PipelineColumnModule {}
