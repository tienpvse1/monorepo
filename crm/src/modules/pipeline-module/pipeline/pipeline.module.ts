import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pipeline } from './entities/pipeline.entity';
import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';

@Module({
  controllers: [PipelineController],
  providers: [PipelineService],
  imports: [TypeOrmModule.forFeature([Pipeline])],
})
export class PipelineModule {}
