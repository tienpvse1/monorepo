import { Module } from '@nestjs/common';
import { PipelineService } from './pipeline.service';
import { PipelineController } from './pipeline.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineRepository } from './pipeline.repository';

@Module({
  controllers: [PipelineController],
  providers: [PipelineService],
  imports: [TypeOrmModule.forFeature([PipelineRepository])],
})
export class PipelineModule {}
