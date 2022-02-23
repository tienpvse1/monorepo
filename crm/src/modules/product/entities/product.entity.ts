import { BaseEntity } from 'src/base/entity.base';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';

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

  @OneToOne(() => Pipeline, (pipeline) => pipeline.product)
  pipeline: Pipeline;

  @OneToMany(() => ProductAccount, (account) => account.product)
  productAccounts: ProductAccount[];
}
