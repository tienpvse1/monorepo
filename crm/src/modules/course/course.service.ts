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
}
