import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { ActivityType } from './entities/activity-type.entity';

@Injectable()
export class ActivityTypeService extends BaseService<ActivityType> {
  constructor(
    @InjectRepository(ActivityType) repository: Repository<ActivityType>,
  ) {
    super(repository);
  }
}
