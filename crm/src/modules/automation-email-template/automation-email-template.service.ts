import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Roles } from 'src/constance';
import { InternalServerEvent } from 'src/constance/event';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Contact } from '../contact/entities/contact.entity';
import { CreateMailerDto } from '../mailer/dto/create-mailer.dto';
import { EmailService } from '../mailer/mailer.service';
import {
  AutomationEmailTemplate,
  EmailTemplateType,
} from './entities/automation-email-template.entity';

export interface IEmailEvent {
  type: EmailTemplateType;
  contact: Contact;
}
@Injectable()
export class AutomationEmailTemplateService extends BaseService<AutomationEmailTemplate> {
  constructor(
    @InjectRepository(AutomationEmailTemplate)
    repository: Repository<AutomationEmailTemplate>,
    private mailerService: EmailService,
    private accountService: AccountService,
  ) {
    super(repository);
  }
  @OnEvent(InternalServerEvent.EMAIL_EVENT)
  sendEmail({ type, contact }: IEmailEvent) {
    if (type === EmailTemplateType.BIRTHDAY) {
      this.sendBirthdayCelebration(contact);
    }
  }

  async sendBirthdayCelebration(contact: Contact) {
    const [account, template] = await Promise.all([
      this.accountService.findOneItem({
        where: {
          role: {
            name: Roles.SYSTEM,
          },
        },
      }),
      this.findOneItem({
        where: {
          type: EmailTemplateType.BIRTHDAY,
        },
      }),
    ]);
    if (!account || !template) return;

    const mail: CreateMailerDto = {
      subject: 'Happy birthday',
      to: [
        {
          email: contact.email,
          isTag: false,
        },
      ],
      value: template.html,
    };
    this.mailerService.sendEmail(mail, '127.0.0.1', account.id);
  }
}
