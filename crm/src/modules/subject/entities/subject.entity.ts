import { Course } from 'src/modules/course/entities/course.entity';
import { BaseEntity, Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity()
export class Subject extends BaseEntity {
  @Column()
  @Index({ unique: true })
  code: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ type: 'boolean', name: 'average_calculate' })
  averageCalculate: boolean;

  @Column()
  method: string;

  @Column({ type: 'float', name: 'pass_score' })
  passScore: number;

  @Column({ type: 'float' })
  duration: number;

  @Column()
  status: string;

  @ManyToOne(() => Course, (course) => course.subjects)
  course: Course;
}
