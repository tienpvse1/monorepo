import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository, Repository } from 'typeorm';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { ChangeStageDto } from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';

@Injectable()
export class PipelineItemService extends BaseService<PipelineItem> {
  constructor(
    @InjectRepository(PipelineItem)
    repository: Repository<PipelineItem>,
  ) {
    super(repository);
  }

  async changeStage(id: string, dto: ChangeStageDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );
    const oldPipelineColumn = await pipelineColumnRepository.findOneItem({
      where: { id: dto.oldStageId },
      relations: ['pipelineItems'],
    });
    const newPipelineColumn = await pipelineColumnRepository.findOneItem({
      where: { id: dto.newStageId },
      relations: ['pipelineItems'],
    });

    const itemToChange = oldPipelineColumn.pipelineItems.filter(
      (item) => item.id === id,
    )[0];

    const popedOldColumn = oldPipelineColumn.pipelineItems.filter(
      (item) => item.id !== id,
    );

    const newIndex = newPipelineColumn.pipelineItems.length;
    popedOldColumn
    
  }
}
