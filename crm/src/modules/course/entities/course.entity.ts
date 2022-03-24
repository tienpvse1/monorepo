import { BaseEntity } from 'src/base/entity.base';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { Subject } from 'src/modules/subject/entities/subject.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

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

  @Column({ type: 'float' })
  price: number;

  @Column({ type: 'boolean', default: false, name: 'is_enable' })
  isEnable: boolean;

  @OneToMany(() => Subject, (subject) => subject.course, { cascade: true })
  subjects: Subject[];

  @OneToMany(
    () => OpportunityRevenue,
    (opportunityRevenue) => opportunityRevenue.course,
  )
  opportunityRevenues: OpportunityRevenue[];
}
