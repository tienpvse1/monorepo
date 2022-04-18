import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum EmailTemplateType {
  CERTIFICATE_EXP = 'certificate_exp',
  COURSE_EXP = 'course_exp',
  BIRTHDAY = 'birthday',
}

@Entity({ name: 'automation_email_template' })
export class AutomationEmailTemplate extends BaseEntity {
  @Column({ type: 'json' })
  design: any;

  @Column({ type: 'enum', enum: EmailTemplateType })
  type: EmailTemplateType;

  @Column({ type: 'mediumtext' })
  html: string;

  @ManyToOne(() => Account, (account) => account.automationEmailTemplates)
  account: Account;
}
