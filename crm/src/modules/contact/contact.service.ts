import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService extends BaseService<Contact> {
  constructor(@InjectRepository(Contact) repository: ContactRepository) {
    super(repository);
  }
  async createOneContact(dto: CreateContactDto, accountId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    const [createResult, account] = await Promise.all([
      this.createItem(dto),
      accountRepository.findOneItem({ where: { id: accountId } }),
    ]);
    createResult.account = account;
    return createResult.save();
  }
  async createManyContact(dto: CreateContactDto[], accountId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    const creator = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    return this.createManyItem(
      dto.map((item) => ({ ...item, account: creator })),
    );
  }
}
