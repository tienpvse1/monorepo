import { IsObject, IsString } from 'class-validator';

export class CreateTagDto {
  @IsString()
  label: string;
  @IsObject()
  styles: object;
}
