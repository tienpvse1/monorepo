import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationService extends BaseService<Notification> {
  constructor(
    @InjectRepository(Notification) repository: Repository<Notification>,
  ) {
    super(repository);
  }
  async seen(accountId: string) {
    const unseen = await this.repository
      .createQueryBuilder('notification')
      .leftJoinAndSelect('notification.receiver', 'receiver')
      .where('receiver.id = :receiverId', { receiverId: accountId })
      .andWhere('seen = :seen ', { seen: false })
      .getMany();

    return this.repository.save(
      unseen.map((notification) => ({ ...notification, seen: true })),
    );
  }
}
