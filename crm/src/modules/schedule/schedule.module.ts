import { Module } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleRepository } from './schedule.repository';

@Module({
  controllers: [ScheduleController],
  providers: [ScheduleService],
  imports: [TypeOrmModule.forFeature([ScheduleRepository])],
})
export class ScheduleModule {}
