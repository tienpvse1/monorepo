import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { ContactRepository } from '../contact/contact.repository';
import { InboxRepository } from '../inbox/inbox.repository';
import { EmailType } from '../mailer/entities/mailer.entity';
import { EmailRepository } from '../mailer/mailer.repository';
import { NotificationService } from '../notification/notification.service';
import { ReceivedEmailDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
  ) {}

  async isReceive(dto: ReceivedEmailDto) {
    if (!dto.data.from) return false;
    const account = await this.accountService.findOneWithoutError({
      where: { email: dto.data.from.address },
    });
    if (!account) return true;

    return false;
  }
  // happen when
  async saveAsInboxToDataBase(dto: ReceivedEmailDto) {
    try {
      const inboxRepository = getCustomRepository(InboxRepository);
      const contactRepository = getCustomRepository(ContactRepository);
      const [sender, receiver, gmailBot] = await Promise.all([
        contactRepository.findOneItem({
          where: { email: dto.data.from.address },
        }),
        this.accountService.findOneItem({
          where: { email: dto.data.to[0].address },
        }),
        this.accountService.findOneItem({
          where: { username: 'gmail' },
        }),
      ]);

      const [result] = await Promise.all([
        this.notificationService.createItem({
          description: `${dto.data.sender.address} sent you an email`,
          name: 'Gmail',
          receiver,
          sender: gmailBot,
          seen: false,
        }),
        inboxRepository.createItem({
          sender,
          receiver,
          body: dto.data.text.html,
          subject: dto.data.subject,
        }),
      ]);
      return result;
    } catch (error) {}
  }
  // an sale send contact an email
  async saveAsSentToDatabase(dto: ReceivedEmailDto) {
    console.log('sending an email');

    if (!dto.data.to) return;
    const contactRepository = getCustomRepository(ContactRepository);
    const emailRepository = getCustomRepository(EmailRepository);
    const [contact, account] = await Promise.all([
      contactRepository.findOneItem({
        where: { email: dto.data.to[0].address },
      }),
      this.accountService.findOneItem({
        where: { username: dto.account },
      }),
    ]);

    const result = await emailRepository.createItem({
      account,
      body: dto.data.text.html,
      subject: dto.data.subject,
      receiverEmail: contact.email,
      type: EmailType.SEND,
    });

    return result;
  }
}
