import { BaseEntity } from 'src/base/entity.base';
import { Course } from 'src/modules/course/entities/course.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';

@Entity({ name: 'opportunity_revenue' })
export class OpportunityRevenue extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @OneToOne(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.opportunityRevenue,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;

  @ManyToOne(() => Course, (course) => course.opportunityRevenues)
  @JoinColumn({ name: 'course_id' })
  course: Course;
}
