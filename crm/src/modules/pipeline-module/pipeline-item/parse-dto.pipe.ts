import { Injectable, PipeTransform } from '@nestjs/common';
import { ContactRepository } from 'src/modules/contact/contact.repository';
import { OpportunityRevenueRepository } from 'src/modules/opportunity-revenue/opportunity-revenue.repository';
import { ProductRepository } from 'src/modules/product/product.repository';
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
    const productRepository = getCustomRepository(ProductRepository);
    const opportunityRevenueRepository = getCustomRepository(
      OpportunityRevenueRepository,
    );
    const { columnId, contactId, opportunityRevenue, ...rest } = value;

    const [column, contact, product] = await Promise.all([
      pipelineColumnRepository.findOneItem({
        where: { id: columnId },
        relations: ['pipelineItems'],
      }),
      contactRepository.findOneItem({
        where: { id: contactId },
        relations: ['pipelineItems'],
      }),
      productRepository.findOneItem({
        where: { id: opportunityRevenue.productId },
        relations: ['opportunityRevenues'],
      }),
    ]);
    const createdOpportunityRevenue =
      await opportunityRevenueRepository.createItem({
        quantity: opportunityRevenue.quantity,
        product: product,
      });
    const newItemIndex = column.pipelineItems.length;
    const savedItem = await pipelineItemRepository.createItem({
      ...rest,
      opportunityRevenue: createdOpportunityRevenue,
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
