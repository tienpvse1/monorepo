import { Length } from 'class-validator';

export class CreateEmailTemplateDto {
  @Length(1)
  name: string;
  design: string;
}
