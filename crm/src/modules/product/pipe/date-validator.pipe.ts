import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { checkDateValid, convertDate } from 'src/util/date';
import { CreateProductDto } from '../dto/create-product.dto';
@Injectable()
export class DateValidatorPipe implements PipeTransform {
  transform(value: CreateProductDto, metadata: ArgumentMetadata) {
    value.endDate = convertDate(value.endDate as string);
    value.startDate = convertDate(value.startDate as string);

    if (!checkDateValid({ startDate: value.startDate, endDate: value.endDate }))
      throw new BadRequestException('end date must greater than start date');
    return value;
  }
}
