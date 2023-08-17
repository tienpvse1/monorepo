import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { PipelineItemService } from '../pipeline-module/pipeline-item/pipeline-item.service';
import { CreateReasonDto } from './dto/create-reason.dto';
import { Reason } from './entities/reason.entity';

@Injectable()
export class ReasonService extends BaseService<Reason> {
  constructor(
    @InjectRepository(Reason) repository: Repository<Reason>,
    private pipelineItemService: PipelineItemService,
  ) {
    super(repository);
  }
  async create({ pipelineItemId, ...rest }: CreateReasonDto) {
    const pipelineItem = await this.pipelineItemService.repository
      .createQueryBuilder('pipelineItem')
      .leftJoinAndSelect('pipelineItem.reason', 'reason')
      .where('pipelineItem.id = :id', { id: pipelineItemId })

      .getOne();
    if (!pipelineItem) throw new BadRequestException('cannot find opportunity');
    if (pipelineItem.reason)
      throw new BadRequestException(
        'this opportunity already have an lose/win reason',
      );
    const { identifiers } = await this.repository.insert({
      ...rest,
      pipelineItem,
      id: nanoid(10),
    });
    return identifiers;
  }
}
