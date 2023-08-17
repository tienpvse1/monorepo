import { Module } from '@nestjs/common';
import { TeamController } from './team.controller';
import { TeamGateway } from './team.gateway';
import { TeamService } from './team.service';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamGateway],
})
export class TeamModule {}
