import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'discount_code' })
export class DiscountCode extends BaseEntity {
  @Column({ name: 'discount_name' })
  name: string;
  @Column({ type: 'float', name: 'discount_amount' })
  discountAmount: number;
  @Column({ type: 'boolean', default: false })
  applied: boolean;
  @Column({ name: 'expired_at' })
  expireAt: Date;

  /**
   * Relations
   */

  @OneToMany(() => PipelineItem, (pipelineItem) => pipelineItem.discountCodes)
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;
  @ManyToOne(() => Account, (account) => account.discountCodes)
  @JoinColumn({ name: 'account_id' })
  createdBy: Account;
}

export class KnexDiscountCode {
  id: string;
  discount_name: string;
  discount_amount: number;
  applied: boolean;
  expired_at: Date;

  pipeline_item_id: string;
  account_id: string;
}
