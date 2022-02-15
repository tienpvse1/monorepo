import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@Injectable()
export class ScheduleService extends BaseService<Schedule> {
  constructor(@InjectRepository(Schedule) repository: Repository<Schedule>) {
    super(repository);
  }
}
