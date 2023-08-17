import { IsString } from 'class-validator';

export class CreateActivityTypeDto {
  @IsString()
  name: string;
  @IsString()
  description: string;
}
