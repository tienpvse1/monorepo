import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineItem } from './entities/pipeline-item.entity';
import { PipelineItemController } from './pipeline-item.controller';
import { PipelineItemService } from './pipeline-item.service';

@Module({
  controllers: [PipelineItemController],
  providers: [PipelineItemService],
  imports: [TypeOrmModule.forFeature([PipelineItem])],
})
export class PipelineItemModule {}
