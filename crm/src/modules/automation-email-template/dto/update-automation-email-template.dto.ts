import { PartialType } from '@nestjs/swagger';
import { CreateAutomationEmailTemplateDto } from './create-automation-email-template.dto';

export class UpdateAutomationEmailTemplateDto extends PartialType(CreateAutomationEmailTemplateDto) {}
