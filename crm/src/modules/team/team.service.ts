import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { isArray } from 'lodash';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamPositionDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(
    @InjectRepository(Team) repository: Repository<Team>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }

  async createTeam(accountId: string, dto: CreateTeamDto) {
    const accountRepository = getCustomRepository(AccountRepository);
    const [count, account] = await Promise.all([
      this.repository.count(),
      accountRepository.findOneItem({ where: { id: accountId } }),
    ]);

    const result = await this.repository
      .create({ ...dto, createdBy: account, index: count })
      .save();
    this.eventEmitter.emit(InternalServerEvent.TEAM_UPDATED);
    return result;
  }

  private async updateAccount(dto: UpdateTeamPositionDto[]) {
    const queryBuilder = getRepository(Account).createQueryBuilder();
    for (const { accounts, id: teamId } of dto) {
      if (!isArray(accounts)) continue;
      const team = await this.findOneItem({ where: { id: teamId } });
      for (const { id, teamIndex } of accounts) {
        await queryBuilder
          .update()
          .set({ teamIndex, team })
          .where('id = :id', { id })
          .execute();
      }
    }
  }

  async updateTeam(dto: UpdateTeamPositionDto[]) {
    this.eventEmitter.emit(InternalServerEvent.TEAM_UPDATED, dto);
    const queryBuilder = this.repository.createQueryBuilder();
    for (const { index, id } of dto) {
      await queryBuilder
        .update()
        .set({
          index: index,
        })
        .where('id = :id', { id })
        .execute();
    }
    await this.updateAccount(dto);
    return this.repository.find({ relations: ['accounts'] });
  }
}
