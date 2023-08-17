import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, Length } from 'class-validator';

export class CreateProductDto {
  @Length(1)
  name: string;

  @ApiProperty({ type: 'string' })
  @IsDate()
  startDate: string | Date;

  @ApiProperty({ type: 'string' })
  @IsDate()
  endDate: string | Date;

  @IsNumber()
  price: number;
}
