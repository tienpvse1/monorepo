import { IsEnum, IsObject } from 'class-validator';
import { EmailTemplateType } from '../entities/automation-email-template.entity';

export class CreateAutomationEmailTemplateDto {
  @IsObject()
  design: any;
  @IsEnum(EmailTemplateType)
  type: EmailTemplateType;

  html: string;
  account_id: string;
}
