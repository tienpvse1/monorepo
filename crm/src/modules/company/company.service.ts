import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { getRepository, Repository } from 'typeorm';
import { City } from '../city/entities/city.entity';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(@InjectRepository(Company) repository: Repository<Company>) {
    super(repository);
  }

  async create({ cityId, ...rest }: CreateCompanyDto) {
    const cityRepo = getRepository(City);
    const city = await cityRepo.findOne(cityId);
    const result = await this.createItem({
      ...rest,
      city,
    });
    return result;
  }
}
