// seeder should only use for testing purposes

import { faker } from '@faker-js/faker';
import { randomlySelect } from 'src/util/array';
import { getCustomRepository, getRepository } from 'typeorm';
import { Account } from '../account/entities/account.entity';
import { CompanyService } from '../company/company.service';
import { Company } from '../company/entities/company.entity';
import { ContactRepository } from './contact.repository';
import { ContactService } from './contact.service';

export const seedContacts = async (quantity: number) => {
  const service = new ContactService(getCustomRepository(ContactRepository));
  const companyService = new CompanyService(getRepository(Company));
  const accountRepository = getRepository(Account);
  const numberOfContacts = await service.repository.count();
  // const c;
  if (numberOfContacts >= quantity) return;
  const numberToGet = quantity - numberOfContacts;
  const randomCompanies: Company[] = await companyService.repository
    .createQueryBuilder()
    .select('*')
    .limit(numberToGet)
    .orderBy('RAND()')
    .execute();
  const randomAccounts: Account[] = await accountRepository
    .createQueryBuilder()
    .select('*')
    .limit(1)
    .orderBy('RAND()')
    .execute();
  await service.createManyContact(
    {
      bulk: Array(numberToGet || 70)
        .fill(1)
        .map(() => ({
          address: faker.address.streetAddress(),
          birth: faker.date.past(40),
          companyName: randomlySelect(randomCompanies).name,
          internalNotes: faker.lorem.paragraph(),
          jobPosition: faker.name.jobTitle(),
          name: faker.name.findName(),
          photo: faker.image.avatar(),
          tagIds: [],
          email: faker.internet.email().toLowerCase(),
          noteWorthies: [],
          phone: faker.phone.phoneNumber(),
        })),
    },
    randomAccounts[0].id,
  );
};
