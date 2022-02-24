import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { CreateSinglePipelineItemDto } from './dto/create-pipeline-item.dto';
import { PipelineItemRepository } from './pipeline-item.repository';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(
    value: CreateSinglePipelineItemDto,
    metadata: ArgumentMetadata,
  ) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );
    const pipelineItemRepository = getCustomRepository(PipelineItemRepository);

    const { columnId, ...rest } = value;
    const column = await pipelineColumnRepository.findOneItem({
      where: { id: columnId },
    });

    const newItem = pipelineItemRepository.create({
      name: rest.name,
      index: rest.index,
    });
    const savedItem = await pipelineItemRepository.save(newItem);
    if (!column.pipelineItems) column.pipelineItems = [];
    column.pipelineItems.push(savedItem);
    const result = await pipelineColumnRepository.save(column);
    return result;
  }
}
