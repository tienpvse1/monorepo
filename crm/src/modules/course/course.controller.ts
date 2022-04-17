import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { InjectKnex, Knex } from 'nestjs-knex';
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
@ApiTags('course')
export class CourseController {
  constructor(
    public readonly service: CourseService,
    @InjectKnex() private knex: Knex,
  ) {}

  @Post('crawl')
  crawlCourses(@Body() data: { data: Course[]; paging: any }) {
    return this.service.crawlData(data);
  }
  @Get('all')
  getAllCourses() {
    return this.knex.select().from('course');
  }
}
