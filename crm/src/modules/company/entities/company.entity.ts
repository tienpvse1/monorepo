import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Tag } from 'src/modules/tag/entities/tag.entity';
import { Column, Entity, Index, ManyToMany, OneToMany } from 'typeorm';

@Entity()
export class Company extends BaseEntity {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  state: string;
  @Column({ nullable: true })
  city: string;
  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  postalCode: string;
  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true, name: 'contact_type' })
  type: string;

  @ManyToMany(() => Tag, (tag) => tag.companies, { cascade: ['insert'] })
  tags: Tag[];

  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];
}
