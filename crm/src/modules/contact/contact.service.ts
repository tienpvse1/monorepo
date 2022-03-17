import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository, getRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';
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
    const account = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    const id = await this.createContact(dto, account);
    return { id };
  }

  async createContact(
    { companyName, ...rest }: CreateContactDto,
    account: Account,
  ) {
    const companyRepository = getRepository(Company);
    const company = await companyRepository
      .createQueryBuilder('company')
      .where('company.name = :name', { name: companyName })
      .getOne();
    if (!company) {
      const company = await companyRepository
        .create({
          name: companyName,
          type: 'company',
        })
        .save();
      const { id } = await this.repository
        .create({
          ...rest,
          company,
          account,
        })
        .save();
      return id;
    } else {
      const { id } = await this.repository
        .create({
          ...rest,
          company,
          account,
        })
        .save();
      return id;
    }
  }
  async createManyContact(
    payload: { bulk: CreateContactDto[] },
    accountId: string,
  ) {
    const accountRepository = getCustomRepository(AccountRepository);
    const ids: string[] = [];
    payload.bulk = payload.bulk.filter((item) => item.companyName != undefined);
    const { bulk } = payload;
    const creator = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    for (const dto of bulk) {
      const id = await this.createContact(dto, creator);
      ids.push(id);
    }
    // return dto;
    return { ids };
  }
}
