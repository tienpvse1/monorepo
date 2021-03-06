import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { Email } from './entities/mailer.entity';
import { EmailRepository } from './mailer.repository';
@Injectable()
export class EmailService extends BaseService<Email> {
  constructor(
    @InjectRepository(Email) repository: EmailRepository,
    private accountService: AccountService,
    private config: ConfigService,
  ) {
    super(repository);
  }

  async addEmailToDB(email: CreateMailerDto, ip: string, senderId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    for (const target of email.to) {
      if (target.isTag) continue;
      this.addWithRelation<Account>(
        {
          ip: ip.split(':')[3],
          receiverEmail: target.email,
        },
        senderId,
        accountRepository,
        'emails',
      );
    }
  }

  async sendEmail(email: CreateMailerDto, ip: string, senderId: string) {
    if (!ip) return;
    const account = await this.accountService.findOneItem({
      where: {
        id: senderId,
      },
    });
    const urlString = `${this.config.get<string>(
      'email.serverUrl',
    )}/email/send`;

    for (const target of email.to) {
      if (target.isTag) continue;
      await axios.post(urlString, {
        from: {
          name: `From ${account.firstName}`,
          address: account.email,
        },
        to: [
          {
            address: target.email,
          },
        ],

        subject: email.subject,
        html: email.value,
        sendAt: new Date(),
      });
      await this.createItem({
        account,
        body: email.value,
        subject: email.subject,
        receiverEmail: target.email,
        ip,
      });
    }

    return email;
  }
}
