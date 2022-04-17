import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Course } from './entities/course.entity';
@Injectable()
export class CourseService extends BaseService<Course> {
  constructor(@InjectRepository(Course) repository: Repository<Course>) {
    super(repository);
  }

  async crawlData(data: { data: Course[]; paging: any }) {
    const courses: Course[] = data.data;

    courses.forEach((course) => {
      const courseEndDate = faker.date.future(3);
      const entity = {
        ...course,
        startDate: faker.date.past(),
        endDate: courseEndDate,
        certificateExp: faker.date.future(2, courseEndDate),
      };
      this.repository.insert(entity);
    });
  }
}
