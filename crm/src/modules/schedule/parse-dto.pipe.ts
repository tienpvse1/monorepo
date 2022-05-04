import { Injectable, PipeTransform } from '@nestjs/common';
import { getCustomRepository, getRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { ActivityType } from '../activity-type/entities/activity-type.entity';
import { PipelineItemRepository } from '../pipeline-module/pipeline-item/pipeline-item.repository';
import {
  CreateScheduleDto,
  ParsedCreateScheduleDto,
} from './dto/create-schedule.dto';

@Injectable()
export class ParseDtoPipe implements PipeTransform {
  async transform(value: CreateScheduleDto): Promise<ParsedCreateScheduleDto> {
    const accountRepository = getCustomRepository(AccountRepository);
    const activityTypeRepository = getRepository(ActivityType);
    const { accountId, pipelineItemId, activityTypeId, ...rest } = value;
    const pipelineItemRepository = getCustomRepository(PipelineItemRepository);
    const account = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    const activityType = await activityTypeRepository.findOne({
      where: { id: activityTypeId },
    });
    const pipelineItem = await pipelineItemRepository.findOneItem({
      where: { id: pipelineItemId },
    });

    return {
      ...rest,
      account,
      pipelineItem,
      activityType,
    };
  }
}
