import { BaseEntity } from 'src/base/entity.base';
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
}
