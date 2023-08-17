import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import { getRepository } from 'typeorm';
import { CityService } from '../city/city.service';
import { City } from '../city/entities/city.entity';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
export const seedCompanies = async (quantity: number): Promise<City[]> => {
  faker.locale = 'vi';
  const service = new CompanyService(getRepository(Company));
  const cityService = new CityService(getRepository(City));
  const count = await service.repository.count();

  if (count >= quantity) return;
  const numberToGet = quantity - count;
  const randomLocation: City[] = await cityService.repository
    .createQueryBuilder()
    .select('*')
    .limit(numberToGet)
    .orderBy('RAND()')
    .execute();

  await service.repository
    .createQueryBuilder('company')
    .insert()
    .into(Company)
    .values(
      Array(numberToGet)
        .fill(1)
        .map((_, index) => ({
          id: nanoid(10),
          address: faker.address.streetAddress(),
          city: randomLocation[index],
          country: 'Vietnam',
          email: faker.internet.email().toLowerCase(),
          name: faker.company.companyName(),
          mobile: faker.phone.phoneNumber(),
          postalCode: '700000',
          state: 'Vietnam',
          taxId: '9999-7777312-421',
          type: 'company',
          website: faker.internet.url(),
        })),
    )
    .execute();
};
