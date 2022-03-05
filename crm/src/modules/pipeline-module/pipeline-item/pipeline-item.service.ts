import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getConnection, getCustomRepository, Repository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
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

    const [oldPipelineColumn, newPipelineColumn] = await Promise.all([
      pipelineColumnRepository.findOneItem({
        where: { id: dto.oldStageId },
        relations: ['pipelineItems'],
      }),
      pipelineColumnRepository.findOneItem({
        where: { id: dto.newStageId },
        relations: ['pipelineItems', 'pipeline'],
      }),
    ]);

    const itemToChange = oldPipelineColumn.pipelineItems.filter(
      (item) => item.id === id,
    )[0];
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();
    try {
      if (!itemToChange)
        throw new BadRequestException(
          'item with this id does not exist in provided old column ',
        );

      oldPipelineColumn.pipelineItems = oldPipelineColumn.pipelineItems.filter(
        (item) => item.id !== id,
      );
      queryRunner.manager.save(oldPipelineColumn);
      if (dto.index != undefined) {
        newPipelineColumn.pipelineItems.splice(dto.index, 0, itemToChange);

        newPipelineColumn.pipelineItems = newPipelineColumn.pipelineItems.map(
          (item, index) =>
            ({
              ...item,
              index,
            } as PipelineItem),
        );
      } else {
        newPipelineColumn.pipelineItems.push({
          ...itemToChange,
          index: newPipelineColumn.pipelineItems.length,
        } as PipelineItem);
      }
      // return newPipelineColumn.save();
      await queryRunner.manager.delete(PipelineColumn, newPipelineColumn.id);

      const result = await queryRunner.manager.save(newPipelineColumn);
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('create failure');
    } finally {
      await queryRunner.release();
    }
  }
}
