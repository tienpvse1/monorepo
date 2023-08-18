import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HasRoles } from '../../common/decorators/role/decorator';
import { User } from '../../common/decorators/user.decorator';
import { Roles } from '../../constant';
import { CreateTeamDto } from './dto/create-team.dto';
import { TeamService } from './team.service';

@Controller('team')
@ApiTags('team')
export class TeamController {
  constructor(public readonly service: TeamService) {}

  @Get()
  findOwnTeam(@User('id', new ParseUUIDPipe({ version: '4' })) userId: string) {
    return this.service.getOwnTeam(userId);
  }

  @Post()
  @HasRoles(Roles.SALE_MANAGER)
  createTeam(@User('id') accountId: string, @Body() dto: CreateTeamDto) {
    return this.service.createTeam(accountId, dto);
  }

  @HasRoles(Roles.SALE_MANAGER)
  @Patch('assign-leader/:accountId/:teamId')
  async assignTeamLeader(
    @Param('accountId') accountId: string,
    @Param('teamId') teamId: string
  ) {
    return this.service.changeLeader({ accountId, id: teamId });
  }
}
