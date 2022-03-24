import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import axios from 'axios';
import { CRUDService } from 'src/base/base.service';
import { getIp } from 'src/util/ip';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { Email } from './entities/mailer.entity';
import { EmailRepository } from './mailer.repository';
@Injectable()
export class EmailService extends CRUDService<Email, EmailRepository> {
  constructor(
    @InjectRepository(EmailRepository) repository: EmailRepository,
    private accountService: AccountService,
    private config: ConfigService,
  ) {
    super(repository);
  }

  async addEmailToDB(email: CreateMailerDto, ip: string, senderId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    this.addWithRelation<Account>(
      {
        ip: ip.split(':')[3],
        receiverEmail: email.to,
      },
      senderId,
      accountRepository,
      'emails',
    );
  }

  async sendEmail(email: CreateMailerDto, ip: string, senderId: string) {
    const account = await this.accountService.findOneItem({
      where: {
        id: senderId,
      },
    });
    const urlString = `${this.config.get<string>('email.serverUrl')}account/${
      account.username
    }/submit?access_token=${this.config.get<string>(
      'EMAIL_SERVER_ACCESS_TOKEN',
    )}`;

    await axios.post(urlString, {
      from: {
        name: `From ${account.firstName}`,
        address: account.email,
      },
      to: [
        {
          address: email.to,
        },
      ],

      subject: email.subject,
      html: email.value,
      sendAt: new Date(),
      deliveryAttempts: 10,
    });
    const newEmail = this.repository.create({
      account,
      ip: getIp(ip),
      receiverEmail: email.value,
    });
    return newEmail.save();
  }
}
