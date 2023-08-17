import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

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
  @Index({
    unique: true,
  })
  type: EmailTemplateType;

  @Column({ type: 'mediumtext' })
  html: string;

  @ManyToOne(() => Account, (account) => account.automationEmailTemplates)
  @JoinColumn({ name: 'account_id' })
  account: Account;
}
export class KnexAutomationEmailTemplate extends BaseEntity {
  design: any;

  type: EmailTemplateType;

  html: string;

  account_id: string;
}
