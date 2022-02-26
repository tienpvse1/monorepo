import { Injectable, PipeTransform } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';

@Injectable()
export class GenerateNestedIdPipe implements PipeTransform {
  transform(value: CreateSinglePipelineItemDto) {
    if (value.addresses)
      value.addresses = value.addresses.map((item) => ({
        ...item,
        id: nanoid(10),
      }));
    if (value.noteWorthies)
      value.noteWorthies = value.noteWorthies.map((item) => ({
        ...item,
        id: nanoid(10),
      }));
    return value;
  }
}
