import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from 'src/modules/contact/contact.repository';
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
    const contactRepository = getCustomRepository(ContactRepository);

    const { columnId, contactId, ...rest } = value;
    const column = await pipelineColumnRepository.findOneItem({
      where: { id: columnId },
      relations: ['pipelineItems'],
    });
    const contact = await contactRepository.findOneItem({
      where: { id: contactId },
      relations: ['pipelineItems'],
    });
    const newItemIndex = column.pipelineItems.length;
    const savedItem = await pipelineItemRepository.createItem({
      ...rest,
      index: newItemIndex,
    });
    if (!column.pipelineItems) column.pipelineItems = [];
    column.pipelineItems.push(savedItem);
    contact.pipelineItems.push(savedItem);
    pipelineColumnRepository.save(column);
    contactRepository.save(contact);
    return savedItem;
  }
}
