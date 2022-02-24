import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { PipelineItemRepository } from '../pipeline-module/pipeline-item/pipeline-item.repository';
import {
  CreateScheduleDto,
  ParsedCreateScheduleDto,
} from './dto/create-schedule.dto';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(
    value: CreateScheduleDto,
    metadata: ArgumentMetadata,
  ): Promise<ParsedCreateScheduleDto> {
    const accountRepository = getCustomRepository(AccountRepository);
    const { accountId, pipelineItemId, ...rest } = value;
    const pipelineItemRepository = getCustomRepository(PipelineItemRepository);
    const account = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    const pipelineItem = await pipelineItemRepository.findOneItem({
      where: { id: pipelineItemId },
    });

    return {
      ...rest,
      account,
      pipelineItem,
    };
  }
}
