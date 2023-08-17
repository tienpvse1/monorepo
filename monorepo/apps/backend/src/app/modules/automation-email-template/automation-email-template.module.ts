import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from '../account/account.module';
import { MailerModule } from '../mailer/mailer.module';
import { AutomationEmailTemplateController } from './automation-email-template.controller';
import { AutomationEmailTemplateService } from './automation-email-template.service';
import { AutomationEmailTemplate } from './entities/automation-email-template.entity';

@Module({
  controllers: [AutomationEmailTemplateController],
  providers: [AutomationEmailTemplateService],
  imports: [
    TypeOrmModule.forFeature([AutomationEmailTemplate]),
    MailerModule,
    AccountModule,
  ],
  exports: [AutomationEmailTemplateService],
})
export class AutomationEmailTemplateModule {}
