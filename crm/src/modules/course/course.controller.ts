import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { Course } from './entities/course.entity';
import { CreateCoursePipe } from './pipe/create-course.pipe';
@Controller('course')
@Crud({
  model: {
    type: Course,
  },
  dto: {
    create: CreateCourseDto,
    update: UpdateCourseDto,
  },
  routes: {
    exclude: ['deleteOneBase', 'createOneBase'],
  },
  query: {
    join: {
      subjects: {},
    },
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
})
@ApiTags('course')
export class CourseController {
  constructor(public service: CourseService) {}

  @Delete(':id')
  @HistoryLog('deleted a course')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Post()
  @HistoryLog('created a course')
  @UsePipes(CreateCoursePipe)
  create(@Body() dto: CreateCourseDto) {
    return this.service.createItem(dto);
  }
}
