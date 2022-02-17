import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { checkDuplicate } from 'src/util/array';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from '../../pipeline-item/entities/pipeline-item.entity';
import { UpdatePipelineDto } from '../dto/update-pipeline.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: UpdatePipelineDto, metadata: ArgumentMetadata) {
    if (!value.pipelineColumns) return value;
    const isDuplicate = checkDuplicate<PipelineColumn>(
      value.pipelineColumns,
      'index',
    );
    if (isDuplicate) {
      throw new BadRequestException('column index is duplicate');
    }

    for (const column of value.pipelineColumns) {
      const isItemDuplicate = checkDuplicate<PipelineItem>(
        column.pipelineItems,
        'index',
      );
      if (isItemDuplicate) {
        throw new BadRequestException("item's index is duplicated");
      }
    }
    return value;
  }
}
