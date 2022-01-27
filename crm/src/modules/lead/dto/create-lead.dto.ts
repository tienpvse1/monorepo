import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsAlpha, IsNumber, IsOptional, IsUrl, Length } from 'class-validator';
@ApiExtraModels()
export class CreateLeadDto {
  @IsAlpha()
  @ApiProperty()
  name: string;
  @IsOptional()
  @IsNumber()
  probability: number;
  @IsOptional()
  @Length(2)
  companyName: string;
  @IsOptional()
  address: string;
  @IsOptional()
  contactName: string;
  @IsOptional()
  email: string;
  @IsOptional()
  jobPosition: string;
  @IsOptional()
  phone: string;
  @IsOptional()
  @IsUrl()
  website: string;
  @IsOptional()
  @IsAlpha()
  language: string;
  @IsOptional()
  @IsNumber()
  priority: number;
}
