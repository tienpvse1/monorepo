import { Injectable, PipeTransform } from '@nestjs/common';
import {
  CreateScheduleDto,
  ParsedCreateScheduleDto,
} from './dto/create-schedule.dto';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(value: CreateScheduleDto): Promise<ParsedCreateScheduleDto> {
    return;
  }
}
