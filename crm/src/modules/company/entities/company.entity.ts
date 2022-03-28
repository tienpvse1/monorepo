import { BaseEntity } from 'src/base/entity.base';
import { City } from 'src/modules/city/entities/city.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Column, Entity, Index, ManyToOne, OneToMany } from 'typeorm';

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
  country: string;

  @Column({ nullable: true })
  postalCode: string;
  @Column({ nullable: true })
  taxId: string;

  @Column({ nullable: true })
  website: string;

  @Column({ nullable: true, name: 'contact_type' })
  type: string;

  /**
   * relations
   */
  @ManyToOne(() => City, (city) => city.companies)
  city: City;

  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];
}
