import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Team } from './entities/team.entity';

@EntityRepository(Team)
export class TeamRepository extends BaseRepository<Team> {}
