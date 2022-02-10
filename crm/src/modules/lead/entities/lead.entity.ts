import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity({ name: 'lead' })
export class Lead extends BaseEntity {
  @Column()
  name: string;
  @Column({ type: 'float' })
  probability: number;
  @Column({ name: 'company_name', nullable: true })
  companyName: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  contactName: string;
  @Column({ nullable: true })
  email: string;
  @Column({ name: 'job_position', nullable: true })
  jobPosition: string;
  @Column({ nullable: true })
  phone: string;
  @Column({ nullable: true })
  website: string;
  @Column({ nullable: true })
  language: string;
  @Column({
    type: 'int',
    default: 1,
  })
  priority: number;
  // one account can be assigned to many leads
  @ManyToOne(() => Account, (account) => account.leads)
  account: Account;
}
