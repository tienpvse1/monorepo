import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TeamGateway } from './team.gateway';

@Module({
  controllers: [TeamController],
  providers: [TeamService, TeamGateway],
  imports: [TypeOrmModule.forFeature([Team])],
})
export class TeamModule {}
