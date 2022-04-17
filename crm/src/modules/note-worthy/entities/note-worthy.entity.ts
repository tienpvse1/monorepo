import { BaseEntity } from 'src/base/entity.base';
import { Company } from 'src/modules/company/entities/company.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
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

  @ManyToOne(() => Company, (company) => company.noteWorthies)
  @JoinColumn({ name: 'company_id' })
  company: Company;
}
