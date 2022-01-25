import { Module } from '@nestjs/common';
import { PipelineColumnService } from './pipeline-column.service';
import { PipelineColumnController } from './pipeline-column.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PipelineColumnRepository } from './pipeline-column.repository';

@Module({
  controllers: [PipelineColumnController],
  providers: [PipelineColumnService],
  imports: [TypeOrmModule.forFeature([PipelineColumnRepository])],
})
export class PipelineColumnModule {}
