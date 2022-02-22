import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('product_account')
export class ProductAccount extends BaseEntity {
  @ManyToOne(() => Product, (product) => product.accounts, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Account, (account) => account.products, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
