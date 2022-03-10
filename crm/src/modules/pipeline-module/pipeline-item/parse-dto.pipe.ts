import { Injectable, PipeTransform } from '@nestjs/common';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(value: CreateSinglePipelineItemDto) {
    const copiedValue = value;
    console.log(
      '🚀 ~ file: parse-dto.pipe.ts ~ line 8 ~ ParseDtoPipe ~ transform ~ copiedValue',
      copiedValue,
    );

    return copiedValue;
  }
}
