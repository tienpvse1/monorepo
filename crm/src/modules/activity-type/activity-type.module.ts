import { Module } from '@nestjs/common';
import { ActivityTypeService } from './activity-type.service';
import { ActivityTypeController } from './activity-type.controller';
import { ActivityType } from './entities/activity-type.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ActivityTypeController],
  providers: [ActivityTypeService],
  imports: [TypeOrmModule.forFeature([ActivityType])],
})
export class ActivityTypeModule {}
