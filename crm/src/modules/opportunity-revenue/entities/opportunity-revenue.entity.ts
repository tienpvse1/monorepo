import { BaseEntity } from 'src/base/entity.base';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Product } from 'src/modules/product/entities/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'opportunity_revenue' })
export class OpportunityRevenue extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @OneToOne(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.opportunityRevenue,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;

  @ManyToOne(() => Product, (product) => product.opportunityRevenues)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
