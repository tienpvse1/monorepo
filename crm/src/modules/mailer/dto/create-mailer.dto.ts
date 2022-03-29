import { IsArray, Length } from 'class-validator';

export class CreateMailerDto {
  @Length(1)
  subject: string;
  @IsArray()
  to: { email: string; isTag: boolean }[];
  @Length(1)
  value: string;
}
