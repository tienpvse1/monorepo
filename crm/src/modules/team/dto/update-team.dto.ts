import { PartialType } from '@nestjs/swagger';
import { Team } from '../entities/team.entity';
import { CreateTeamDto } from './create-team.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}

export class UpdateTeamPositionDto extends Team {}
