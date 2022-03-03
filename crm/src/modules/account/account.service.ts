import { BadRequestException, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { getCustomRepository, Repository } from 'typeorm';
import { TeamRepository } from '../team/team.repository';
import { JoinTeamDto } from './dto/create-account.dto';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(
    @InjectRepository(Account) repository: Repository<Account>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }

  async joinTeam({ accountId, teamId }: JoinTeamDto) {
    const teamRepository = getCustomRepository(TeamRepository);
    const [account, team] = await Promise.all([
      this.findOneItem({ where: { id: accountId } }),
      teamRepository.findOneItem({
        where: { id: teamId },
        relations: ['accounts'],
      }),
    ]);

    if (team.accounts == undefined) {
      team.accounts = [account];
      return team.save();
    }
    for (const { id } of team.accounts) {
      if (id === accountId)
        throw new BadRequestException('already join this team');
    }
    team.accounts.push(account);
    this.eventEmitter.emit(InternalServerEvent.NEW_MEMBER_JOIN_TEAM, {
      account,
      teamId,
    });
    return team.save();
  }
}
