import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { Email } from './entities/mailer.entity';
import { EmailRepository } from './mailer.repository';

@Injectable()
export class EmailService extends CRUDService<Email, EmailRepository> {
  constructor(@InjectRepository(EmailRepository) repository: EmailRepository) {
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
}
