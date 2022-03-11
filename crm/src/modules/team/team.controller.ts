import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/constance';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto, UpdateTeamPositionDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { UpdatePositionPipe } from './team.pipe';
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
  routes: {
    createOneBase: {
      decorators: [HistoryLog('created a team')],
    },
    updateOneBase: {
      decorators: [HistoryLog('updated a team')],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted a team')],
    },
    exclude: [
      'createManyBase',
      'createOneBase',
      'replaceOneBase',
      'updateOneBase',
      'deleteOneBase',
    ],
  },
})
export class TeamController {
  constructor(public readonly service: TeamService) {}

  @Post()
  @HasRoles(Roles.SALE_MANAGER)
  createTeam(@User('id') accountId: string, @Body() dto: CreateTeamDto) {
    return this.service.createTeam(accountId, dto);
  }

  @Patch()
  @UsePipes(UpdatePositionPipe)
  updatePosition(@Body() teams: UpdateTeamPositionDto[]) {
    return this.service.updateTeam(teams);
  }

  @Delete(':id')
  @HistoryLog('Deleted a team')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
