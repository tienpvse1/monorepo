import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { EmailTemplate } from 'src/modules/email-template/entities/email-template.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { History } from 'src/modules/history/entities/history.entity';
import { Inbox } from 'src/modules/inbox/entities/inbox.entity';
import { Email } from 'src/modules/mailer/entities/mailer.entity';
import { Notification } from 'src/modules/notification/entities/notification.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import { AutomationEmailTemplate } from 'src/modules/automation-email-template/entities/automation-email-template.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { DiscountCode } from 'src/modules/discount-code/entities/discount-code.entity';
import { Company } from 'src/modules/company/entities/company.entity';
@Entity()
export class Account extends BaseEntity {
  @Column()
  @Index({
    unique: true,
  })
  username: string;

  @Column({ name: 'first_name', nullable: true })
  firstName: string;
  @Column({ name: 'is_enable', default: false })
  isEnable: boolean;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({
    type: 'varchar',
    default:
      'https://www.mona.uwi.edu/modlang/sites/default/files/modlang/male-avatar-placeholder.png',
  })
  photo: string;

  @Column()
  @Index({
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({ name: 'team_index', type: 'int', nullable: true })
  teamIndex: number;

  @Column({ nullable: true })
  @Length(10)
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  city?: string;
  @Column({ nullable: true, name: 'postal_code' })
  postalCode?: string;
  @Column({ nullable: true })
  state?: string;
  @Column({ nullable: true })
  country?: string;

  @Column({ name: 'is_leader', type: 'boolean', default: false })
  isLeader: boolean;

  @OneToOne(() => Session, (session) => session.account)
  session: Session;

  @OneToMany(() => Team, (team) => team.createdBy)
  createdTeams: Team[];

  // account can be assigned to sell product to any opportunity by sale manager
  @OneToMany(() => PipelineItem, (pipeline) => pipeline.account)
  pipelineItems: PipelineItem[];

  @OneToMany(() => PipelineItem, (pipeline) => pipeline.createBy)
  createdPipelineItems: PipelineItem[];

  @OneToMany(() => Company, (company) => company.creator)
  createdCompany: Company;

  // an account can upload multiple files
  @OneToMany(() => File, (pipeline) => pipeline.account)
  files: File[];

  // an account can have many email template
  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates.account)
  emailTemplates: EmailTemplate[];

  @OneToMany(() => Email, (email) => email.account)
  emails: Email[];

  @OneToMany(() => Inbox, (inbox) => inbox.receiver)
  inboxEmails: Inbox[];

  @OneToMany(() => History, (history) => history.account)
  histories: History[];

  @OneToMany(() => Schedule, (schedule) => schedule.account)
  schedules: Schedule[];

  @OneToMany(() => Contact, (contact) => contact.account)
  contacts: Contact[];

  @OneToMany(() => ProductAccount, (product) => product.account)
  productAccounts: ProductAccount[];

  @OneToMany(() => Notification, (notification) => notification.receiver)
  inboxNotifications: Notification[];
  @OneToMany(() => DiscountCode, (discountCode) => discountCode.createdBy)
  discountCodes: DiscountCode[];

  @OneToMany(() => Notification, (notification) => notification.sender)
  sentNotifications: Notification[];

  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Team, (team) => team.accounts)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToMany(() => AutomationEmailTemplate, (templates) => templates.account)
  automationEmailTemplates: AutomationEmailTemplate[];

  // hash the password before save or update it in database
  @BeforeInsert()
  hashPassword() {
    // only hash if there's password
    if (this.password) {
      this.password = hashSync(this.password, 10);
    }
  }
  @BeforeUpdate()
  hashPasswordBeforeUpdate() {
    if (this.password) {
      // this.password = hashSync(this.password, 10);
    }
  }
}
