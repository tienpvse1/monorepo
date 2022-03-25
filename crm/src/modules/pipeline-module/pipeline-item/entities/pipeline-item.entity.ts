import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { OpportunityHistory } from 'src/modules/opportunity-history/entities/opportunity-history.entity';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { Reason } from 'src/modules/reason/entities/reason.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
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

  @OneToOne(() => Reason, (reason) => reason.pipelineItem, { cascade: true })
  reason: Reason;

  @ManyToOne(() => Account, (account) => account.pipelineItems)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Contact, (contact) => contact.pipelineItems)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @ManyToMany(() => Tag, (tag) => tag.pipelineItems, {
    eager: true,
    cascade: true,
  })
  tags: Tag[];

  @OneToMany(() => Schedule, (schedule) => schedule.pipelineItem, {
    cascade: true,
    eager: true,
  })
  schedules: Schedule[];

  @OneToMany(() => OpportunityHistory, (history) => history.pipelineItem, {
    cascade: true,
  })
  histories: OpportunityHistory[];

  @OneToMany(() => NoteWorthy, (noteWorthies) => noteWorthies.pipelineItem, {
    cascade: true,
    eager: true,
  })
  noteWorthies: NoteWorthy[];

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
