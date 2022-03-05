import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { reIndexItems } from 'src/util/pipeline-column';
// import { reIndexItems } from 'src/util/pipeline-column';
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

  async getColumn(dto: ChangeStageDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );
    const [oldColumn, newColumn] = await Promise.all([
      pipelineColumnRepository.findOneItem({
        where: { id: dto.oldStageId },
        relations: ['pipelineItems'],
      }),
      pipelineColumnRepository.findOneItem({
        where: { id: dto.newStageId },
        relations: ['pipelineItems'],
      }),
    ]);
    if (oldColumn == undefined || newColumn == undefined)
      throw new NotFoundException();
    return [oldColumn, newColumn];
  }

  async changeStage(id: string, dto: ChangeStageDto) {
    const [oldColumn, newColumn] = await this.getColumn(dto);
    reIndexItems(oldColumn);
    reIndexItems(newColumn);
    const item = oldColumn.pipelineItems.filter((item) => item.id === id)[0];
    if (!item) this.throwNotFoundException('item not found in old column');
    oldColumn.pipelineItems.splice(item.index, 1);

    newColumn.pipelineItems.splice(
      dto.index || newColumn.pipelineItems.length,
      0,
      item,
    );
    // const [result1, result2] = await Promise.all([
    //   this.repository.remove(clone(newColumn).pipelineItems),
    //   this.repository.remove(clone(oldColumn).pipelineItems),
    // ]);
    // console.log(result2);
    reIndexItems(oldColumn);
    reIndexItems(newColumn);

    // console.log(oldColumn);
    // console.log(newColumn);
    await oldColumn.save();
    await newColumn.save();
    return [oldColumn, newColumn];
  }
}
