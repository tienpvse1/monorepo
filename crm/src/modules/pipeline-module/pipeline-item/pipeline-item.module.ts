import { Module } from '@nestjs/common';
import { PipelineItemService } from './pipeline-item.service';
import { PipelineItemController } from './pipeline-item.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineItemRepository } from './pipeline-item.repository';

@Module({
  controllers: [PipelineItemController],
  providers: [PipelineItemService],
  imports: [TypeOrmModule.forFeature([PipelineItemRepository])],
})
export class PipelineItemModule {}
