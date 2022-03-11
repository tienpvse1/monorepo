import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { Contact } from 'src/modules/contact/entities/contact.entity';
import { EmailTemplate } from 'src/modules/email-template/entities/email-template.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { History } from 'src/modules/history/entities/history.entity';
import { Invitation } from 'src/modules/invitation/entities/invitation.entity';
import { Lead } from 'src/modules/lead/entities/lead.entity';
import { Email } from 'src/modules/mailer/entities/mailer.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Session } from 'src/modules/session/entities/session.entity';
import { Team } from 'src/modules/team/entities/team.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true, type: 'text' })
  photo: string;

  @Column()
  @Index({
    unique: true,
  })
  @IsEmail()
  email: string;

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

  @OneToOne(() => Session, (session) => session.account)
  session: Session;

  @OneToMany(() => Invitation, (invitation) => invitation.sender)
  sentInvitations: Invitation[];
  @ManyToMany(() => Invitation, (invitation) => invitation.receivers)
  receivedInvitations: Invitation[];

  // !updated: account will no longer own any pipeline anymore
  // @OneToOne(() => Pipeline, (pipeline) => pipeline.account)
  // pipeline: Pipeline;

  // account can be assign to sell product to any opportunity by sale manager
  @OneToMany(() => PipelineItem, (pipeline) => pipeline.account)
  pipelineItems: PipelineItem[];

  // an account can upload multiple files
  @OneToMany(() => File, (pipeline) => pipeline.account)
  files: File[];

  // an account can have many email template
  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates.account)
  emailTemplates: EmailTemplate[];

  // an account here act as the sender of an email
  @OneToMany(() => Email, (email) => email.account)
  emails: Email[];

  @OneToMany(() => Lead, (lead) => lead.account)
  leads: Lead[];

  @OneToMany(() => History, (history) => history.account)
  histories: History[];

  @OneToMany(() => Schedule, (schedule) => schedule.account)
  schedules: Schedule[];

  @OneToMany(() => Contact, (contact) => contact.account)
  contacts: Contact[];

  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ManyToOne(() => Team, (team) => team.accounts)
  @JoinColumn({ name: 'team_id' })
  team: Team;

  @OneToMany(() => Team, (team) => team.createdBy)
  @JoinColumn({ name: 'team_id' })
  createdTeams: Team[];

  @OneToMany(() => ProductAccount, (product) => product.account)
  productAccounts: ProductAccount[];

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
