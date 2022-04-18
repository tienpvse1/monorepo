import { Controller } from '@nestjs/common';
import { AutomationEmailTemplateService } from './automation-email-template.service';

@Controller('automation-email-template')
export class AutomationEmailTemplateController {
  constructor(
    readonly automationEmailTemplateService: AutomationEmailTemplateService,
  ) {}
}
