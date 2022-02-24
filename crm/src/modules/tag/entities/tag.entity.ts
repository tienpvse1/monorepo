import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;
  @Column()
  color: string;

  @ManyToMany(() => PipelineItem, (pipelineItem) => pipelineItem.tags)
  @JoinTable({
    name: 'tag_pipeline_item',
    joinColumn: { name: 'pipeline_item_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  pipelineItems: PipelineItem[];

  @ManyToMany(() => Contact, (contact) => contact.tags)
  @JoinTable({
    name: 'tag_contact',
    joinColumn: { name: 'contact_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  contacts: Contact[];
}
