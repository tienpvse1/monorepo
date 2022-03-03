import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamService } from './team.service';

@Controller('team')
@ApiTags('team')
@Crud({
  model: {
    type: Team,
  },
  dto: {
    create: CreateTeamDto,
    update: UpdateTeamDto,
  },
  query: {
    join: {
      accounts: {
        alias: 'acc',
      },
    },
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
})
export class TeamController {
  constructor(public readonly service: TeamService) {}
}
