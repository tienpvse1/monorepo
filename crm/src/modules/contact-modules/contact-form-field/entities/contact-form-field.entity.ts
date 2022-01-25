import { BaseEntity } from 'src/base/entity.base';
import { FormFieldType } from 'src/constance/form.type';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ContactForm } from '../../contact-form/entities/contact-form.entity';

@Entity({ name: 'contact_form_field' })
export class ContactFormField extends BaseEntity {
  @Column()
  title: string;

  @Column({ type: 'enum', enum: FormFieldType, default: FormFieldType.STRING })
  type: FormFieldType;

  @Column()
  value: string;

  @ManyToOne(() => ContactForm, (contactForm) => contactForm.contactFormFields)
  contactForm: ContactForm;
}
