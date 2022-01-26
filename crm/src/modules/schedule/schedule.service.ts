import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { Schedule } from './entities/schedule.entity';
import { ScheduleRepository } from './schedule.repository';

@Injectable()
export class ScheduleService extends CRUDService<Schedule, ScheduleRepository> {
  constructor(
    @InjectRepository(ScheduleRepository) repository: ScheduleRepository,
  ) {
    super(repository);
  }
}
