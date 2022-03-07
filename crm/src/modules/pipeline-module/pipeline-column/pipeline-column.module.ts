import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineColumn } from './entities/pipeline-column.entity';
import { PipelineColumnController } from './pipeline-column.controller';
import { PipelineColumnService } from './pipeline-column.service';

@Module({
  controllers: [PipelineColumnController],
  providers: [PipelineColumnService],
  imports: [TypeOrmModule.forFeature([PipelineColumn])],
  exports: [PipelineColumnService],
})
export class PipelineColumnModule {}
