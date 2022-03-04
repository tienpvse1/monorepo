import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { InternalServerEvent } from 'src/constance/event';
import { getCustomRepository, In, Repository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { Invitation } from './entities/invitation.entity';
@Injectable()
export class InvitationService extends BaseService<Invitation> {
  constructor(
    @InjectRepository(Invitation) repository: Repository<Invitation>,
    private eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }
  async createInvitation({
    accountIds,
    message,
    senderId,
  }: CreateInvitationDto) {
    const newInvitation = this.repository.create({ message });
    const accountRepository = getCustomRepository(AccountRepository);
    const [sender, receivers] = await Promise.all([
      accountRepository.findOneItem({ where: { id: senderId } }),
      accountRepository.findMany({ where: { id: In(accountIds) } }),
    ]);
    Object.assign(newInvitation, { sender, receivers });
    const result = newInvitation.save();
    this.eventEmitter.emit(InternalServerEvent.INVITATION_SENT, result);
    return result;
  }
}
