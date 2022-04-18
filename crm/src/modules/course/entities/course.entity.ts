import { BaseEntity } from 'src/base/entity.base';
import { OpportunityRevenue } from 'src/modules/opportunity-revenue/entities/opportunity-revenue.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Course extends BaseEntity {
  @Column()
  name: string;
  @Column()
  code: string;
  @Column({ name: 'start_date' })
  startDate: Date;
  @Column({ name: 'end_date' })
  endDate: Date;
  @Column({ type: 'float', default: 10000000 })
  price: number;

  @Column({ name: 'number_of_trainee', nullable: true })
  numberOfTrainee: number;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ name: 'certificate_exp' })
  certificateExp: Date;

  @Column({ name: 'course_type', nullable: true, type: 'json' })
  course_Type?: any;
  @Column({ name: 'course_detail', type: 'json', nullable: true })
  course_Detail?: any;

  /**
   * relations
   */
  @OneToMany(() => OpportunityRevenue, (revenue) => revenue.course)
  opportunityRevenues: OpportunityRevenue[];
}
