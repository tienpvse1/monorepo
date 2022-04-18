import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Cron, CronExpression } from '@nestjs/schedule';
import { InternalServerEvent } from 'src/constance/event';
import { IEmailEvent } from 'src/modules/automation-email-template/automation-email-template.service';
import { EmailTemplateType } from 'src/modules/automation-email-template/entities/automation-email-template.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { getRepository } from 'typeorm';
// import { InjectKnex, Knex } from 'nestjs-knex';
// import { Contact } from 'src/modules/contact/entities/contact.entity';

@Injectable()
export class TasksService {
  constructor(private eventEmitter: EventEmitter2) {}
  // constructor(@InjectKnex() private knex: Knex) {}
  getContactAndItInfo() {
    // this.knex<Contact>('contact')
    //   .select()
    //   .whereRaw('Month(birth) = ?', [new Date().getMonth() + 1])
    //   .andWhereRaw('Day(birth) = ?', [new Date().getDate()])
    //   .leftJoin('pipeline_item', 'pipeline_item.contact_id', '=', 'contact.id')
    //   .leftJoin('account', 'pipeline_item.account_id', '=', 'account.id');
  }

  @Cron(CronExpression.EVERY_DAY_AT_6AM)
  async handleCron() {
    //get all contact whose birthday is current day
    const contacts = await getRepository(Contact)
      .createQueryBuilder('contact')
      .where('Month(birth) = :month', { month: new Date().getMonth() + 1 })
      .andWhere('Day(birth) = :day', { day: new Date().getDate() })
      .leftJoinAndSelect('contact.pipelineItems', 'pipelineItems')
      .leftJoinAndSelect('pipelineItems.account', 'account')
      .getMany();

    for (const contact of contacts) {
      const payload: IEmailEvent = {
        type: EmailTemplateType.BIRTHDAY,
        contact,
      };
      this.eventEmitter.emit(InternalServerEvent.EMAIL_EVENT, payload);
    }
  }
}
