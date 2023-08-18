import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ required: true })
  username: string;
  @ApiProperty({ required: true })
  email: string;
  @ApiProperty({ required: true })
  password: string;
  @ApiProperty()
  firstName: string;
  @ApiProperty()
  lastName: string;
  @ApiProperty()
  teamId?: string;
}
