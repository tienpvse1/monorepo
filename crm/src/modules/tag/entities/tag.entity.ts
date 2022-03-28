import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;
  @Column()
  color: string;

  @ManyToMany(() => Contact, (contact) => contact.tags)
  @JoinTable({
    name: 'tag_contact',
    joinColumn: { name: 'tag_id' },
    inverseJoinColumn: { name: 'contact_id' },
  })
  contacts: Contact[];
}
