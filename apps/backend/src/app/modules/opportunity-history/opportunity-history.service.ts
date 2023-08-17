import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { PipelineColumnService } from '../pipeline-module/pipeline-column/pipeline-column.service';
import { PipelineItemService } from '../pipeline-module/pipeline-item/pipeline-item.service';
import { CreateOpportunityHistoryDto } from './dto/create-opportunity-history.dto';
import { OpportunityHistory } from './entities/opportunity-history.entity';

@Injectable()
export class OpportunityHistoryService extends BaseService<OpportunityHistory> {
  constructor(
    @InjectRepository(OpportunityHistory)
    repository: Repository<OpportunityHistory>,
    private pipelineItemService: PipelineItemService,
    private pipelineColumnService: PipelineColumnService,
  ) {
    super(repository);
  }
  async create({
    newStageID,
    oldStageId,
    pipelineItemId,
    ...rest
  }: CreateOpportunityHistoryDto) {
    const itemQueryBuilder =
      this.pipelineItemService.repository.createQueryBuilder('pipelineItem');
    const columnQueryBuilder =
      this.pipelineColumnService.repository.createQueryBuilder(
        'pipelineColumn',
      );
    const [pipelineItem, oldStage, newStage] = await Promise.all([
      itemQueryBuilder.where('id = :id', { id: pipelineItemId }).getOne(),
      columnQueryBuilder.where('id = :oldStageId', { oldStageId }).getOne(),
      columnQueryBuilder.where('id = :newStageID', { newStageID }).getOne(),
    ]);
    if (!pipelineItem || !oldStage || !newStage)
      throw new BadRequestException(
        'cannot find one of items with provided ids',
      );
    const { identifiers } = await this.repository.insert({
      ...rest,
      id: nanoid(10),
      oldStage,
      newStage,
      pipelineItem,
    });
    return identifiers;
  }
}
