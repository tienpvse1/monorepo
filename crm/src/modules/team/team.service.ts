import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Team } from './entities/team.entity';

@Injectable()
export class TeamService extends BaseService<Team> {
  constructor(@InjectRepository(Team) repository: Repository<Team>) {
    super(repository);
  }
}
