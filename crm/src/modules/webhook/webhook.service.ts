import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { NotificationService } from '../notification/notification.service';
import { ReceivedEmailDto } from './dto/create-webhook.dto';

@Injectable()
export class WebhookService {
  constructor(
    private notificationService: NotificationService,
    private accountService: AccountService,
  ) {}

  async saveToDataBase(dto: ReceivedEmailDto) {
    const [sender, receiver] = await Promise.all([
      this.accountService.findOneItem({
        where: { username: 'gmail' },
      }),
      this.accountService.findOneItem({ where: { username: dto.account } }),
    ]);
    const result = await this.notificationService.createItem({
      description: `${dto.data.sender.address} sent you an email`,
      name: 'Gmail',
      receiver,
      sender,
      seen: false,
    });
    return result;
  }
}
