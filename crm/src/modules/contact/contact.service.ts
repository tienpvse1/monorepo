import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository, getRepository, In } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { Company } from '../company/entities/company.entity';
import { Tag } from '../tag/entities/tag.entity';
import { ContactRepository } from './contact.repository';
import { CreateContactDto } from './dto/create-contact.dto';
import { AddTagDto, UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Injectable()
export class ContactService extends BaseService<Contact> {
  constructor(@InjectRepository(Contact) repository: ContactRepository) {
    super(repository);
  }
  async createOneContact(dto: CreateContactDto, accountId: string) {
    const accountRepository = getCustomRepository(AccountRepository);
    const tagRepository = getRepository(Tag);
    const [account, tags] = await Promise.all([
      accountRepository.findOneItem({
        where: { id: accountId },
      }),
      tagRepository.find({
        where: { id: In(dto.tagIds) },
      }),
    ]);
    const id = await this.createContact(dto, account, tags);
    return { id };
  }

  async createContact(
    { companyName, ...rest }: CreateContactDto,
    account: Account,
    tags: Tag[] = [],
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
          tags,
        })
        .save();
      return id;
    } else {
      const { id } = await this.repository
        .create({
          ...rest,
          company,
          account,
          tags,
        })
        .save();
      return id;
    }
  }
  async createManyContact(
    payload: { bulk: CreateContactDto[] },
    accountId: string,
  ) {
    const tagRepository = getRepository(Tag);
    const accountRepository = getCustomRepository(AccountRepository);
    const ids: string[] = [];
    payload.bulk = payload.bulk.filter((item) => item.companyName != undefined);
    const { bulk } = payload;
    const creator = await accountRepository.findOneItem({
      where: { id: accountId },
    });
    for (const dto of bulk) {
      if (dto.tagIds) {
        const tags = await tagRepository.find({
          where: { id: In(dto.tagIds) },
        });
        const id = await this.createContact(dto, creator, tags);
        ids.push(id);
      } else {
        const id = await this.createContact(dto, creator, []);
        ids.push(id);
      }
    }
    // return dto;
    return { ids };
  }

  async addTags(id: string, dto: AddTagDto) {
    const tagRepository = getRepository(Tag);
    const [contact, tags] = await Promise.all([
      this.findOneItem({ where: { id }, relations: ['tags'] }),
      tagRepository.find({ where: { id: In(dto.tagIds) } }),
    ]);
    if (!contact.tags) contact.tags = [];
    const filteredTags = tags.filter(
      (tag) => !contact.tags.some((contactTag) => contactTag.id === tag.id),
    );
    contact.tags.push(...filteredTags);
    return contact.save();
  }

  async updateTags(id: string, dto: AddTagDto) {
    const tagRepository = getRepository(Tag);
    const [contact, tags] = await Promise.all([
      this.findOneItem({ where: { id }, relations: ['tags'] }),
      tagRepository.find({ where: { id: In(dto.tagIds) } }),
    ]);
    contact.tags = [];

    contact.tags.push(...tags);
    return contact.save();
  }

  async updateContact(
    id: string,
    { companyName, tagIds, ...rest }: UpdateContactDto,
  ) {
    if (companyName) {
      const companyRepository = getRepository(Company);
      const tagRepository = getRepository(Tag);
      const [company, contact, tags] = await Promise.all([
        companyRepository
          .createQueryBuilder('company')
          .where('company.name = :name', { name: companyName })
          .getOne(),
        this.repository
          .createQueryBuilder('contact')
          .where('id = :id', { id })
          .getOne(),
        tagRepository.find({
          where: {
            id: In(tagIds),
          },
        }),
      ]);
      const newObject = { ...contact, ...rest };
      newObject.company = company;
      newObject.tags = tags;

      return this.repository.save(newObject);
    }
    return this.repository.update(id, rest);
  }
}
