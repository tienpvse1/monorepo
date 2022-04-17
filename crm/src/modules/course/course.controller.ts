import { Body, Controller, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';

@Controller('course')
@Crud({
  dto: {
    create: CreateCourseDto,
    update: UpdateCourseDto,
  },
  model: {
    type: Course,
  },
})
export class CourseController {
  constructor(public readonly service: CourseService) {}

  @Post('crawl')
  crawlCourses(@Body() data: { data: Course[]; paging: any }) {
    return this.service.crawlData(data);
  }
}
