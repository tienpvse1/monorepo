import { BaseEntity } from 'src/base/entity.base';
import { Address } from 'src/modules/address/entities/address.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';

@Entity({ name: 'contact' })
export class Contact extends BaseEntity {
  @Column()
  name: string;
  @Column({ nullable: true })
  birth: Date;

  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  mobile: string;
  @Column({ nullable: true, name: 'contact_type' })
  type: string;
  @Column({ nullable: true })
  email: string;
  @Column({ nullable: true })
  photo: string;

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
  @ManyToMany(() => Tag, (tag) => tag.contacts, { cascade: true })
  tags: Tag[];

  @OneToMany(() => PipelineItem, (pipelineItem) => pipelineItem.contact, {
    cascade: true,
  })
  pipelineItems: PipelineItem[];
  @OneToMany(() => Address, (address) => address.contact, {
    cascade: true,
  })
  addresses: Address[];
  @OneToMany(() => NoteWorthy, (noteWorthy) => noteWorthy.contact, {
    cascade: true,
  })
  noteWorthies: NoteWorthy[];
}
