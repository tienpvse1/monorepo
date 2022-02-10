import { BaseEntity } from 'src/base/entity.base';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline_item' })
export class PipelineItem extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: 1 })
  index: number;
  @ManyToOne(
    () => PipelineColumn,
    (pipelineColumn) => pipelineColumn.pipelineItems,
  )
  @JoinColumn({
    name: 'pipeline_column_id',
  })
  pipelineColumn: PipelineColumn;
}
