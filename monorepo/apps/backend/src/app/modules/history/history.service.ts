import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getIp } from 'src/util/ip';
import { getCustomRepository, Repository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { CreateHistoryDto } from './dto/create-history.dto';
import { History } from './entities/history.entity';

@Injectable()
export class HistoryService extends BaseService<History> {
  constructor(@InjectRepository(History) repository: Repository<History>) {
    super(repository);
  }

  async create(dto: CreateHistoryDto, rawIp: string, accountId: string) {
    const ip = getIp(rawIp);
    if (
      dto.method !== 'GET' &&
      dto.method !== 'POST' &&
      dto.method !== 'PUT' &&
      dto.method !== 'PATCH' &&
      dto.method !== 'DELETE'
    )
      throw new BadRequestException('Must be method');
    const accountRepository = getCustomRepository(AccountRepository);
    const account = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    const result = await this.createItem({
      ip,
      account,
      ...dto,
    });
    return result;
  }
}
