import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, Length } from 'class-validator';

export class CreateTeamDto {
  @Length(1)
  @ApiProperty()
  name: string;
  @ApiProperty({ type: 'string' })
  @IsUUID('4', { message: 'leader id must be uuid' })
  leaderId: string;
}
