import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { DiscountCode } from 'src/modules/discount-code/entities/discount-code.entity';
import { OpportunityHistory } from 'src/modules/opportunity-history/entities/opportunity-history.entity';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { Reason } from 'src/modules/reason/entities/reason.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline_item' })
export class PipelineItem extends BaseEntity {
  @Column()
  name: string;
  @Column({ default: 1, name: 'index_position' })
  index: number;

  @Column({ type: 'int', default: '0' })
  priority: number;

  @Column({ name: 'expected_closing', type: 'date', nullable: true })
  expectedClosing: Date;

  @Column({ name: 'expected_revenue', default: '0' })
  expectedRevenue: number;

  @Column({ type: 'longtext', nullable: true })
  description: string;

  @Column({ type: 'boolean', default: false, name: 'is_lose' })
  isLose: boolean;

  /**
   * relations
   */
  @OneToOne(
    () => OpportunityRevenue,
    (opportunityRevenue) => opportunityRevenue.pipelineItem,
    { cascade: true },
  )
  opportunityRevenue: OpportunityRevenue;
  @ManyToOne(() => DiscountCode, (discountCode) => discountCode.pipelineItem)
  @JoinColumn({ name: 'discount_code_id' })
  discountCodes: DiscountCode[];

  @OneToOne(() => Reason, (reason) => reason.pipelineItem, { cascade: true })
  reason: Reason;

  @ManyToOne(() => Account, (account) => account.pipelineItems)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Account, (account) => account.createdPipelineItems)
  @JoinColumn({ name: 'creator_id' })
  createBy: Account;

  @ManyToOne(() => Contact, (contact) => contact.pipelineItems)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @OneToMany(() => Schedule, (schedule) => schedule.pipelineItem, {
    cascade: true,
    eager: true,
  })
  schedules: Schedule[];

  @OneToMany(() => OpportunityHistory, (history) => history.pipelineItem, {
    cascade: true,
  })
  histories: OpportunityHistory[];

  @ManyToOne(
    () => PipelineColumn,
    (pipelineColumn) => pipelineColumn.pipelineItems,
    {
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn({
    name: 'pipeline_column_id',
  })
  pipelineColumn: PipelineColumn;
}
