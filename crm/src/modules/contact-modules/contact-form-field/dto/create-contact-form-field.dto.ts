import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, Length } from 'class-validator';
import { FormFieldType } from 'src/constance/form.type';

export class CreateContactFormFieldDto {
  @Length(0)
  title: string;
  @IsEnum(FormFieldType)
  @ApiProperty({
    enum: FormFieldType,
    default: FormFieldType.STRING,
  })
  type: FormFieldType;
  @Length(1)
  value: string;
}
