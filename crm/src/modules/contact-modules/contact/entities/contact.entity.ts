import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity, OneToOne } from 'typeorm';
import { ContactForm } from '../../contact-form/entities/contact-form.entity';

@Entity({ name: 'contact2' })
export class Contact extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @OneToOne(() => ContactForm, (contactForm) => contactForm.contact)
  contactForm: ContactForm;
}
