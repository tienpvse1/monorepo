import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsBoolean()
  averageCalculate: boolean;

  @IsString()
  method: string;

  @IsNumber()
  passScore: number;

  @IsNumber()
  duration: number;
}
