import { Injectable, PipeTransform } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';
import { PipelineItemRepository } from './pipeline-item.repository';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(value: CreateSinglePipelineItemDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );
    const pipelineItemRepository = getCustomRepository(PipelineItemRepository);

    const { columnId, ...rest } = value;
    const column = await pipelineColumnRepository.findOneItem({
      where: { id: columnId },
      relations: ['pipelineItems'],
    });
    const newItemIndex = column.pipelineItems.length;
    const savedItem = await pipelineItemRepository.createItem({
      ...rest,
      index: newItemIndex,
    });
    if (!column.pipelineItems) column.pipelineItems = [];
    column.pipelineItems.push(savedItem);
    const result = await pipelineColumnRepository.save(column);
    return result;
  }
}
