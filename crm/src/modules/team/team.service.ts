import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository, Repository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { CreateTeamDto } from './dto/create-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(@InjectRepository(Team) repository: Repository<Team>) {
    super(repository);
  }

  async createTeam(accountId: string, dto: CreateTeamDto) {
    const accountRepository = getCustomRepository(AccountRepository);
    const [count, account] = await Promise.all([
      this.repository.count(),
      accountRepository.findOneItem({ where: { id: accountId } }),
    ]);

    return this.repository
      .create({ ...dto, createdBy: account, index: count })
      .save();
  }
}
