import { hashSync } from 'bcryptjs';
import { Exclude } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';
import { BaseEntity } from 'src/base/entity.base';
import { EmailTemplate } from 'src/modules/email-template/entities/email-template.entity';
import { File } from 'src/modules/file/entities/file.entity';
import { History } from 'src/modules/history/entities/history.entity';
import { Lead } from 'src/modules/lead/entities/lead.entity';
import { Email } from 'src/modules/mailer/entities/mailer.entity';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Session } from 'src/modules/session/entities/session.entity';
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
@Entity()
export class Account extends BaseEntity {
  @Column({ name: 'first_name', nullable: true })
  firstName: string;

  @Column({ name: 'last_name', nullable: true })
  lastName: string;

  @Column({ nullable: true })
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

  @Column({ default: false, name: 'is_social_account' })
  isSocialAccount: boolean;

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

  @OneToOne(() => Pipeline, (pipeline) => pipeline.account)
  pipeline: Pipeline;

  @OneToOne(() => File, (pipeline) => pipeline.account)
  file: File;

  @OneToMany(() => EmailTemplate, (emailTemplates) => emailTemplates.account)
  emailTemplates: EmailTemplate[];

  @OneToMany(() => Email, (email) => email.account)
  emails: Email[];

  @OneToMany(() => Lead, (lead) => lead.account)
  leads: Lead[];

  @OneToMany(() => History, (history) => history.account)
  histories: History[];

  @OneToMany(() => Schedule, (schedule) => schedule.account)
  schedules: Schedule[];

  @ManyToOne(() => Role, (role) => role.accounts)
  @JoinColumn({ name: 'role_id' })
  role: Role;

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
      this.password = hashSync(this.password, 10);
    }
  }
}
