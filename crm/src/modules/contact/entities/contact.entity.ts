import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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
  @Column({ nullable: true })
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

  @OneToMany(() => PipelineItem, (pipelineItem) => pipelineItem.contact, {
    cascade: true,
  })
  pipelineItems: PipelineItem[];

  @OneToMany(() => NoteWorthy, (noteWorthy) => noteWorthy.contact, {
    cascade: true,
  })
  noteWorthies: NoteWorthy[];
}
