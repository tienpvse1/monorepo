import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Inbox extends BaseEntity {
  @Column({ type: 'text' })
  subject: string;

  @Column({ type: 'longtext' })
  body: string;

  @ManyToOne(() => Account, (account) => account.inboxEmails)
  @JoinColumn({ name: 'account_id' })
  receiver: Account;

  @ManyToOne(() => Contact, (contact) => contact.sentEmails)
  @JoinColumn({ name: 'contact_id' })
  sender: Contact;
}
