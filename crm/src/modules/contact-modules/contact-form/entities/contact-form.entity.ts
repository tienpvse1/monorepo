import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact-modules/contact/entities/contact.entity';
import { Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ContactFormField } from '../../contact-form-field/entities/contact-form-field.entity';

@Entity({ name: 'contact_form' })
export class ContactForm extends BaseEntity {
  @OneToOne(() => Contact, (contact) => contact.contactForm)
  @JoinColumn({ name: 'contact_id' })
  contact: Contact;

  @OneToMany(
    () => ContactFormField,
    (contactFormFields) => contactFormFields.contactForm,
  )
  contactFormFields: ContactFormField[];
}
