import { Module } from '@nestjs/common';
import { ReasonService } from './reason.service';
import { ReasonController } from './reason.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reason } from './entities/reason.entity';
import { PipelineItemModule } from '../pipeline-module/pipeline-item/pipeline-item.module';

@Module({
  controllers: [ReasonController],
  providers: [ReasonService],
  imports: [TypeOrmModule.forFeature([Reason]), PipelineItemModule],
})
export class ReasonModule {}
