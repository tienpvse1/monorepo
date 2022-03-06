import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineColumnModule } from '../pipeline-column/pipeline-column.module';
import { PipelineItemModule } from '../pipeline-item/pipeline-item.module';
import { Pipeline } from './entities/pipeline.entity';
import { PipelineController } from './pipeline.controller';
import { PipelineGateway } from './pipeline.gateway';
import { PipelineService } from './pipeline.service';

@Module({
  controllers: [PipelineController],
  providers: [PipelineService, PipelineGateway],
  imports: [
    TypeOrmModule.forFeature([Pipeline]),
    PipelineItemModule,
    PipelineColumnModule,
  ],
})
export class PipelineModule {}
