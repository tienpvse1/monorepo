import { BaseEntity } from 'src/base/entity.base';
import { Schedule } from 'src/modules/schedule/entities/schedule.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'activity_type' })
export class ActivityType extends BaseEntity {
  @Column()
  name: string;
  @Column()
  description: string;

  @OneToMany(() => Schedule, (schedule) => schedule.activityType)
  schedules: Schedule;
}
