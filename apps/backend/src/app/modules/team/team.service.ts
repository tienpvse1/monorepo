import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../kysely';
import { ChangeLeaderDto } from './dto/change-leader.dto';
import { CreateTeamDto } from './dto/create-team.dto';

@Injectable()
export class TeamService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async createTeam(accountId: string, dto: CreateTeamDto) {
    const createFn = this.kysely
      .insertInto('team')
      .values({ ...dto, createdById: accountId })
      .returningAll()
      .executeTakeFirstOrThrow();
    const [team, error] = await resolve(createFn);
    if (!team || error) throw new BadRequestException('cannot create team');
    return team;
  }

  async changeLeader({ accountId, id }: ChangeLeaderDto) {
    const updateFn = this.kysely
      .updateTable('team')
      .set({ leaderId: accountId })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    const [updatedTeam, error] = await resolve(updateFn);
    if (!updatedTeam || error)
      throw new BadRequestException('cannot change team leader');
    return updatedTeam;
  }
}
