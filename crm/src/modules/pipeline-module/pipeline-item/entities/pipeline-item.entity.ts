import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Address } from 'src/modules/address/entities/address.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
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
  Unique,
} from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline_item' })
@Unique(['index', 'pipelineColumn.id'])
export class PipelineItem extends BaseEntity {
  @Column()
  name: string;
  @Column({ default: 1, name: 'index_position' })
  index: number;
  @Column({ type: 'float', name: 'expected_revenue', default: 1000 })
  expectedRevenue: number;

  @Column({ nullable: true })
  photo: string;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ type: 'int', default: '0' })
  priority: number;

  @Column({ name: 'expected_closing', type: 'date', nullable: true })
  expectedClosing: Date;

  @Column({ type: 'longtext', name: 'internal_description', nullable: true })
  internalDescription: string;

  @Column({ nullable: true })
  state: string;
  @Column({ nullable: true })
  postalCode: string;
  @Column({ nullable: true })
  taxId: string;
  @Column({ nullable: true })
  jobPosition: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  title: string;
  @Column({ nullable: true, name: 'internal_note' })
  internalNotes: string;

  @OneToOne(
    () => OpportunityRevenue,
    (opportunityRevenue) => opportunityRevenue.pipelineItem,
    { cascade: true },
  )
  opportunityRevenue: OpportunityRevenue;

  @ManyToOne(() => Account, (account) => account.pipelineItems)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @ManyToOne(() => Contact, (contact) => contact.pipelineItems)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @ManyToMany(() => Tag, (tag) => tag.pipelineItems)
  tags: Tag[];

  @OneToMany(() => Schedule, (schedule) => schedule.pipelineItem)
  schedules: Schedule[];
  @OneToMany(() => Address, (address) => address.pipelineItem, {
    cascade: true,
  })
  addresses: Address[];
  @OneToMany(() => NoteWorthy, (noteWorthies) => noteWorthies.pipelineItem, {
    cascade: true,
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
