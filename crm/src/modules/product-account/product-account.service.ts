import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { ProductAccount } from './entities/product-account.entity';

@Injectable()
export class ProductAccountService extends BaseService<ProductAccount> {
  constructor(
    @InjectRepository(ProductAccount) repository: Repository<ProductAccount>,
  ) {
    super(repository);
  }
}
