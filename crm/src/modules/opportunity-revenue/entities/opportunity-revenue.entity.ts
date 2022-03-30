import { BaseEntity } from 'src/base/entity.base';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

@Entity({ name: 'opportunity_revenue' })
export class OpportunityRevenue extends BaseEntity {
  @Column({ type: 'int' })
  quantity: number;

  @Column()
  courseId: string;

  @OneToOne(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.opportunityRevenue,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;
}
