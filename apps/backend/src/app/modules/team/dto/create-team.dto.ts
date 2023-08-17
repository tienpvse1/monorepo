import { Length } from 'class-validator';

export class CreateTeamDto {
  @Length(1)
  name: string;
}
