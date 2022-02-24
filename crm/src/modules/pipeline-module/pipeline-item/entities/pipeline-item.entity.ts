import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline_item' })
@Unique(['index', 'pipelineColumn.id'])
export class PipelineItem extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'float', name: 'expected_revenue', default: 1000 })
  expectedRevenue: number;

  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ type: 'int', default: '0' })
  priority: number;

  @Column({ name: 'expected_closing', type: 'date', nullable: true })
  expectedClosing: Date;

  @Column({ type: 'longtext', name: 'internal_description', nullable: true })
  internalDescription: string;

  @ManyToOne(() => Account, (account) => account.pipelineItems)
  account: Account;

  @ManyToOne(() => Contact, (contact) => contact.pipelineItems)
  contact: Contact;

  @ManyToMany(() => Tag, (tag) => tag.pipelineItems)
  tags: Tag[];

  @OneToMany(() => Schedule, (schedule) => schedule.pipelineItem)
  schedules: Schedule[];

  @Column({ default: 1, name: 'index_position' })
  index: number;

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
