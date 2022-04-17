import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

export enum EmailTemplateType {
  CERTIFICATE_EXP = 'certificate_exp',
  COURSE_EXP = 'course_exp',
}

@Entity({ name: 'automation_email_template' })
export class AutomationEmailTemplate extends BaseEntity {
  @Column({ type: 'json' })
  design: any;

  @ManyToOne(() => Account, (account) => account.automationEmailTemplates)
  account: Account;
}
