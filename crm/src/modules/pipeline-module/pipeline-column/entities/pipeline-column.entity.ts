import { BaseEntity } from 'src/base/entity.base';
import { OpportunityHistory } from 'src/modules/opportunity-history/entities/opportunity-history.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PipelineItem } from '../../pipeline-item/entities/pipeline-item.entity';

@Entity({ name: 'pipeline_column' })
export class PipelineColumn extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: 0, name: 'index_position' })
  index: number;

  @OneToMany(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.pipelineColumn,
    { eager: true, cascade: true },
  )
  pipelineItems: PipelineItem[];
  @OneToMany(() => OpportunityHistory, (history) => history.oldStage, {
    cascade: true,
  })
  source: OpportunityHistory[];
  @OneToMany(() => OpportunityHistory, (history) => history.newStage, {
    cascade: true,
  })
  destination: OpportunityHistory[];
}
