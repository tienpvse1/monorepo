import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getRepository, Repository } from 'typeorm';
import { Course } from '../course/entities/course.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { Subject } from './entities/subject.entity';

@Injectable()
export class SubjectService extends BaseService<Subject> {
  constructor(@InjectRepository(Subject) repository: Repository<Subject>) {
    super(repository);
  }

  async create({ courseId, ...rest }: CreateSubjectDto) {
    const courseRepository = getRepository(Course);
    const course = await courseRepository.findOne(courseId);
    if (!course) throw new NotFoundException('course not found');
    const newSubject = this.repository.create({
      ...rest,
      course,
    });
    return newSubject.save();
  }
}
