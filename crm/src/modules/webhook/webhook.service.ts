import { Injectable } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { ContactRepository } from '../contact/contact.repository';
import { InboxRepository } from '../inbox/inbox.repository';
import { NotificationService } from '../notification/notification.service';
import { WebHookDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
  ) {}

  async isReceive(email: string) {
    if (!email) return false;
    const account = await this.accountService.findOneWithoutError({
      where: { email },
    });
    if (!account) return true;

    return false;
  }
  // happen when
  async saveAsInboxToDataBase(dto: WebHookDto) {
    try {
      const inboxRepository = getCustomRepository(InboxRepository);
      const contactRepository = getCustomRepository(ContactRepository);
      const [sender, receiver, gmailBot] = await Promise.all([
        contactRepository.findOne({
          where: { email: dto.from.value[0].address },
        }),
        this.accountService.findOneItem({
          where: { email: dto.to.value[0].address },
        }),
        this.accountService.findOneItem({
          where: { username: 'gmail' },
        }),
      ]);

      if (!sender) {
        const [result] = await Promise.all([
          this.notificationService.createItem({
            description: `${dto.from.value[0].name} sent you an email`,
            name: 'Gmail',
            receiver,
            sender: gmailBot,
            seen: false,
          }),
          inboxRepository.createItem({
            receiver,
            body: dto.html,
            subject: dto.subject,
            isAnonymous: true,
          }),
        ]);
        return result;
      }

      const [result] = await Promise.all([
        this.notificationService.createItem({
          description: `${dto.from.value[0].address} sent you an email`,
          name: 'Gmail',
          receiver,
          sender: gmailBot,
          seen: false,
        }),
        inboxRepository.createItem({
          sender,
          receiver,
          body: dto.html,
          subject: dto.subject,
        }),
      ]);
      return result;
    } catch (error) {}
  }
}
