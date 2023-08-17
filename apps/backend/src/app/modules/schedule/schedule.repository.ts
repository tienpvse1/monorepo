import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Schedule } from './entities/schedule.entity';

@EntityRepository(Schedule)
export class ScheduleRepository extends BaseRepository<Schedule> {}
