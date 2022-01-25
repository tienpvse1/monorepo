import { BaseEntity } from 'src/base/entity.base';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { PipelineItem } from '../../pipeline-item/entities/pipeline-item.entity';

@Entity({ name: 'pipeline-column' })
export class PipelineColumn extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineColumns)
  @JoinColumn({ name: 'pipeline_id' })
  pipeline: Pipeline;

  @OneToMany(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.pipelineColumn,
    { eager: true },
  )
  pipelineItems: PipelineItem[];
}
