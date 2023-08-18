import { Field, ID, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsUUID, Length } from 'class-validator';

export class CreateAccountDto {
  @Length(6)
  username: string;
  @Length(2, 100)
  @IsOptional()
  firstName: string;
  @Length(2, 100)
  @IsOptional()
  lastName: string;
  @IsEmail({})
  @ApiProperty({ type: 'string', format: 'email' })
  email: string;
  @Length(6, 50)
  password: string;
  @ApiProperty({ description: 'image url', format: 'uri' })
  @IsOptional()
  image: string;
  @Length(10)
  @ApiProperty({ type: 'string', format: 'uuid' })
  teamId: string;
  @Length(10)
  roleId: string;
}

@InputType()
export class JoinTeamDto {
  @Field(() => ID)
  @IsUUID('4')
  teamId: string;
}
