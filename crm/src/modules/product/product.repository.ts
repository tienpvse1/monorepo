import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Product } from './entities/product.entity';

@EntityRepository(Product)
export class ProductRepository extends BaseRepository<Product> {}
