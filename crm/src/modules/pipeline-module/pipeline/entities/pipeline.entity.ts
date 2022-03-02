import { nanoid } from 'nanoid';
import { BaseEntity } from 'src/base/entity.base';
import { Product } from 'src/modules/product/entities/product.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline' })
export class Pipeline extends BaseEntity {
  @Column()
  name: string;

  // !remove relation between account and pipeline, a pipeline should be existed only one in the system
  // @OneToOne(() => Account, (account) => account.pipeline)
  // @JoinColumn({ name: 'account_id' })
  // account: Account;

  @OneToOne(() => Product, (product) => product.pipeline)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @OneToMany(
    () => PipelineColumn,
    (pipelineColumn) => pipelineColumn.pipeline,
    { eager: true, cascade: true },
  )
  pipelineColumns: PipelineColumn[];

  @BeforeInsert()
  override generateID() {
    if (this.id == null) {
      this.id = nanoid(10);
    }
    for (const column of this.pipelineColumns) {
      if (column.id == null) {
        column.id = nanoid(10);
      }
      for (const item of column.pipelineItems) {
        if (item.id == null) {
          item.id = nanoid(10);
        }
      }
    }
  }

  @BeforeUpdate()
  generateIdForUpdate() {
    if (!this.pipelineColumns) return;
    for (const column of this.pipelineColumns) {
      if (column.id == null) {
        column.id = nanoid(10);
      }
      for (const item of column.pipelineItems) {
        if (item.id == null) {
          item.id = nanoid(10);
        }
      }
    }
  }
}
