import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { City } from 'src/modules/city/entities/city.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { NoteWorthy } from 'src/modules/note-worthy/entities/note-worthy.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

export enum CompanySource {
  Twitter = 'Twitter',
  Phone = 'Phone',
  Youtube = 'Youtube',
  Facebook = 'Facebook',
  Instagram = 'Instagram',
  DirectMeeting = 'DirectMeeting',
  Presenter = 'Presenter',
  Advertisement = 'Advertisement',
  Other = 'Other',
}

@Entity()
export class Company extends BaseEntity {
  @Column()
  @Index({ unique: true })
  name: string;

  @Column({ nullable: true })
  mobile: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true, name: 'foundation_date', type: 'date' })
  foundationDate: Date;

  @Column({
    nullable: true,
    enum: CompanySource,
    type: 'enum',
    default: CompanySource.Other,
  })
  source: string;

  @Column({ nullable: true })
  @Index({ unique: true })
  email: string;

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

  @ManyToOne(() => Account, (account) => account.createdCompany)
  @JoinColumn({ name: 'account_id' })
  creator: Account;

  @OneToMany(() => Contact, (contact) => contact.company)
  contacts: Contact[];

  @OneToMany(() => NoteWorthy, (noteWorthies) => noteWorthies.company)
  noteWorthies: NoteWorthy[];
}
