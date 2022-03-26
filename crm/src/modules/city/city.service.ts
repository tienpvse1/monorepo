import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';

@Injectable()
export class CityService extends BaseService<City> {
  constructor(@InjectRepository(City) repository: Repository<City>) {
    super(repository);
  }
}
