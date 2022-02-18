import { IsIP, IsUrl, Length } from 'class-validator';

export class CreateHistoryDto {
  @IsUrl()
  url: string;

  @IsIP()
  ip: string;

  @Length(1)
  name: string;
}
