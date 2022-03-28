import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Inbox } from 'src/modules/inbox/entities/inbox.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  birth: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  email: string;
  @Column({
    default:
      'https://www.mona.uwi.edu/modlang/sites/default/files/modlang/male-avatar-placeholder.png',
    type: 'varchar',
  })
  photo: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  jobPosition: string;

  @Column({ nullable: true, name: 'internal_note' })
  internalNotes: string;

  /**
   * relations
   */

  @ManyToOne(() => Account, (account) => account.contacts)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(() => Inbox, (inbox) => inbox.sender)
  sentEmails: Inbox[];

  @ManyToOne(() => Company, (company) => company.contacts)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @OneToMany(() => PipelineItem, (pipelineItem) => pipelineItem.contact, {
    cascade: true,
  })
  pipelineItems: PipelineItem[];

  @OneToMany(() => NoteWorthy, (noteWorthy) => noteWorthy.contact, {
    cascade: true,
  })
  noteWorthies: NoteWorthy[];

  @ManyToMany(() => Tag, (tag) => tag.contacts)
  tags: Tag[];
}
