import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Course } from './entities/course.entity';

@EntityRepository(Course)
export class CourseRepository extends BaseRepository<Course> {}
