import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
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

  async getExpireCert() {
    const today = moment(new Date()).add(1, 'days').format('YYYY/MM/DD');

    const result = await this.repository
      .createQueryBuilder('course')
      .select()
      .where(
        `(select 
          CAST(course.certificate_exp AS DATE) as create_date) = :date`,
        { date: today },
      )
      .leftJoinAndSelect('course.opportunityRevenues', 'courseRevenue')
      .leftJoinAndSelect('courseRevenue.pipelineItem', 'item')
      .leftJoinAndSelect('item.account', 'account')
      .leftJoinAndSelect('item.contact', 'contact')
      .getMany();
    return result.map((item) => ({ type: 'certificate_exp', ...item }));
  }

  async getAlmostStartCourse() {
    const today = moment(new Date()).add(1, 'days').format('YYYY/MM/DD');
    const result = await this.repository
      .createQueryBuilder('course')
      .select()
      .where(
        `(select 
          CAST(course.start_date AS DATE) as start_date) = :startDate`,
        { startDate: today },
      )
      .getMany();
    return result.map((item) => ({ ...item, type: 'course_start' }));
  }
  async getAlmostEndCourse() {
    const today = moment(new Date()).add(1, 'days').format('YYYY/MM/DD');
    const result = await this.repository
      .createQueryBuilder('course')
      .select()
      .where(
        `(select 
          CAST(course.end_date AS DATE) as end_date) = :expireDate`,
        { expireDate: today },
      )

      .getMany();
    return result.map((item) => ({ ...item, type: 'course_end' }));
  }
}
