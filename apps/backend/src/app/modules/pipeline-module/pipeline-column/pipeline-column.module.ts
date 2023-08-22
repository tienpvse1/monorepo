import { Module } from '@nestjs/common';
import { PipelineColumnController } from './pipeline-column.controller';
import { PipelineColumnResolver } from './pipeline-column.resolver';
import { PipelineColumnService } from './pipeline-column.service';

@Module({
  controllers: [PipelineColumnController],
  providers: [PipelineColumnService, PipelineColumnResolver],
})
export class PipelineColumnModule {}
