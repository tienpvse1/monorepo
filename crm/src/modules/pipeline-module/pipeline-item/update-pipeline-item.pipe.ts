import { Injectable, PipeTransform } from '@nestjs/common';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';

@Injectable()
export class UpdatePipelineItemPipe implements PipeTransform {
  async transform(value: UpdatePipelineItemDto) {
    return value;
  }
}
