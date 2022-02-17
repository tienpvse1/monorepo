import { BaseEntity } from 'src/base/entity.base';
import { Pipeline } from 'src/modules/pipeline-module/pipeline/entities/pipeline.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from 'typeorm';
import { PipelineItem } from '../../pipeline-item/entities/pipeline-item.entity';

@Entity({ name: 'pipeline_column' })
@Unique(['index', 'pipeline.id'])
export class PipelineColumn extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: 0, name: 'index_position' })
  index: number;

  @ManyToOne(() => Pipeline, (pipeline) => pipeline.pipelineColumns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pipeline_id' })
  pipeline: Pipeline;

  @OneToMany(
    () => PipelineItem,
    (pipelineItem) => pipelineItem.pipelineColumn,
    { eager: true, cascade: true },
  )
  pipelineItems: PipelineItem[];
}
