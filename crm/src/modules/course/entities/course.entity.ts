import { Account } from 'src/modules/account/entities/account.entity';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { ProductAccount } from 'src/modules/product-account/entities/product-account.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
} from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column()
  name: string;

  @Column({ type: 'datetime', name: 'start_date' })
  startDate: Date;

  @Column({ type: 'datetime', name: 'end_date' })
  endDate: Date;

  @Column()
  @Index({ unique: true })
  code: string;

  @Column({ type: 'boolean' })
  isEnable: string;

  @OneToMany(() => Subject, (subject) => subject.course)
  subjects: Subject[];

  @OneToMany(
    () => OpportunityRevenue,
    (opportunityRevenue) => opportunityRevenue.course,
  )
  opportunityRevenues: OpportunityRevenue[];
}
