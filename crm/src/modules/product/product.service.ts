import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(@InjectRepository(Product) repository: Repository<Product>) {
    super(repository);
  }
}
