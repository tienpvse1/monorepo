import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'note_worthy' })
export class NoteWorthy extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'date' })
  date: Date;

  @ManyToOne(() => Contact, (contact) => contact.noteWorthies)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;
  @ManyToOne(() => PipelineItem, (pipelineItem) => pipelineItem.noteWorthies, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;
}
