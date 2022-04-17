import { Module } from '@nestjs/common';
import { AutomationEmailTemplateService } from './automation-email-template.service';
import { AutomationEmailTemplateController } from './automation-email-template.controller';

@Module({
  controllers: [AutomationEmailTemplateController],
  providers: [AutomationEmailTemplateService]
})
export class AutomationEmailTemplateModule {}
