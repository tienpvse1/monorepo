import { BaseEntity } from 'src/base/entity.base';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'date', name: 'end_date' })
  endDate: Date;

  @Column({ type: 'float' })
  price: number;

  @OneToMany(() => ProductAccount, (account) => account.product)
  productAccounts: ProductAccount[];
  @OneToMany(
    () => OpportunityRevenue,
    (opportunityRevenue) => opportunityRevenue.product,
  )
  opportunityRevenues: OpportunityRevenue[];
}
