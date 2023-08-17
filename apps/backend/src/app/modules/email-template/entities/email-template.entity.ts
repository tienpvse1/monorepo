import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'email_template' })
export class EmailTemplate extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'json' })
  design: string;

  @ManyToOne(() => Account, (account) => account.emailTemplates)
  account: Account;
}
