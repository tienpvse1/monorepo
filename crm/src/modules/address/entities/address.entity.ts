import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum AddressTypes {
  HOME = 'home',
  WORK = 'word',
  OTHER = 'other',
}

@Entity()
export class Address extends BaseEntity {
  @Column({ type: 'enum', enum: AddressTypes, name: 'address_type' })
  type: AddressTypes;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  country: string;

  @ManyToOne(() => Contact, (contact) => contact.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;
  @ManyToOne(() => PipelineItem, (pipelineItem) => pipelineItem.addresses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;
}
