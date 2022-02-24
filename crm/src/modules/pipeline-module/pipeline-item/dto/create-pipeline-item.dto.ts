import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUrl,
  Length,
  Matches,
  Min,
} from 'class-validator';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

export class CreatePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;
}
export class CreateSinglePipelineItemDto {
  @Length(1)
  name: string;
  @IsNumber()
  @Min(0)
  index: number;
  @Length(10)
  columnId: string;

  @IsNumber()
  @IsOptional()
  expectedRevenue?: number;

  @IsUrl()
  @IsOptional()
  photo?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsPhoneNumber('VN')
  @IsOptional()
  phone?: string;

  @IsNumber()
  @IsOptional()
  priority?: number;

  @Matches(
    /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/,
    { message: 'end date is invalid' },
  )
  @IsOptional()
  expectedClosing?: Date;

  @IsString()
  @IsOptional()
  internalDescription?: string;
}
export class ParsedCreateSinglePipelineItemDto {
  name: string;
  index: number;
  column: PipelineColumn;

  expectedRevenue?: number;
  photo?: string;
  email?: string;
  phone?: string;
  priority?: number;
  expectedClosing?: Date;
  internalDescription?: string;
}
