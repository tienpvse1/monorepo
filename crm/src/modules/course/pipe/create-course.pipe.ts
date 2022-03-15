import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { checkDateValid, convertDate } from 'src/util/date';
import { CreateCourseDto } from '../dto/create-course.dto';

@Injectable()
export class CreateCoursePipe implements PipeTransform {
  transform(value: CreateCourseDto) {
    value.endDate = convertDate(value.endDate as string);
    value.startDate = convertDate(value.startDate as string);

    if (!checkDateValid({ startDate: value.startDate, endDate: value.endDate }))
      throw new BadRequestException('end date must greater than start date');
    return value;
  }
}
