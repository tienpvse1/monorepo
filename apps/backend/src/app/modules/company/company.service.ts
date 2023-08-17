import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getCustomRepository, getRepository, Repository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { City } from '../city/entities/city.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(@InjectRepository(Company) repository: Repository<Company>) {
    super(repository);
  }

  async create({ cityId, ...rest }: CreateCompanyDto, userId: string) {
    const cityRepo = getRepository(City);
    const accountRepository = getCustomRepository(AccountRepository);
    const [city, account] = await Promise.all([
      cityRepo.findOne(cityId),
      accountRepository.findOneItem({ where: { id: userId } }),
    ]);
    const result = await this.createItem({
      ...rest,
      city,
      creator: account,
    });
    return result;
  }

  async updateCompany(id: string, { cityId, ...rest }: UpdateCompanyDto) {
    if (cityId) {
      const cityRepository = getRepository(City);
      const city = await cityRepository.findOne({ where: { id: cityId } });
      return this.repository.update(id, {
        ...rest,
        city,
      });
    }
    return this.repository.update(id, { ...rest });
  }

  async getWithColumn() {
    return this.repository.find({
      relations: [
        'contacts',
        'contacts.pipelineItems',
        'contacts.pipelineItems.pipelineColumn',
        'contacts.pipelineItems.opportunityRevenue',
        'contacts.pipelineItems.opportunityRevenue.course',
        'creator',
      ],
      loadEagerRelations: false,
    });
  }
}
