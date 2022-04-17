import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity } from 'typeorm';

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
}
