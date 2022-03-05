import { IsString, Length } from 'class-validator';

export class CreateHistoryDto {
  @IsString()
  url: string;

  @Length(1)
  name: string;

  @IsString()
  method: string;
}
