import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { ProductAccountService } from '../product-account/product-account.service';
import { ParsedAssignAccountDto } from './dto/assign-account.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) repository: Repository<Product>,
    private accountService: AccountService,
    private productAccount: ProductAccountService,
  ) {
    super(repository);
  }

  async assignAccounts(dtos: ParsedAssignAccountDto[]) {
    const bulk: { product: Product; account: Account }[] = [];
    for (const dto of dtos) {
      const account = await this.accountService.findOneItem({
        where: { id: dto.accountId },
      });
      const product = await this.findOneItem({ where: { id: dto.productId } });
      bulk.push({
        product,
        account,
      });
    }
    return this.productAccount.createManyItem(bulk);
  }
}
