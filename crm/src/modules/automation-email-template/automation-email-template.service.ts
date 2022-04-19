import { BadRequestException, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { nanoid } from 'nanoid';
import { InjectKnex, Knex } from 'nestjs-knex';
import { BaseService } from 'src/base/nestjsx.service';
import { Roles } from 'src/constance';
import { InternalServerEvent } from 'src/constance/event';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Contact } from '../contact/entities/contact.entity';
import { CreateMailerDto } from '../mailer/dto/create-mailer.dto';
import { EmailService } from '../mailer/mailer.service';
import { CreateAutomationEmailTemplateDto } from './dto/create-automation-email-template.dto';
import { UpdateAutomationEmailTemplateDto } from './dto/update-automation-email-template.dto';
import {
  AutomationEmailTemplate,
  EmailTemplateType,
  KnexAutomationEmailTemplate,
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
    @InjectKnex() private knex: Knex,
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

  async createEmailTemplate(dto: CreateAutomationEmailTemplateDto) {
    try {
      const id = nanoid(10);
      await this.knex<KnexAutomationEmailTemplate>(
        'automation_email_template',
      ).insert({
        ...dto,
        id,
      });
      return { id };
    } catch (error) {
      throw new BadRequestException('cannot create email template');
    }
  }

  async updateEmailTemplate(dto: UpdateAutomationEmailTemplateDto, id: string) {
    return this.knex<KnexAutomationEmailTemplate>('automation_email_template')
      .update(dto)
      .where({ id });
  }
}
