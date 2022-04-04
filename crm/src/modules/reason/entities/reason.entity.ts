import { BaseEntity } from 'src/base/entity.base';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

export enum ReasonType {
  WIN = 'win',
  lose = 'lose',
}

@Entity()
export class Reason extends BaseEntity {
  @Column({
    name: 'reason_type',
    enum: ReasonType,
    type: 'enum',
    default: 'win',
  })
  reasonType: ReasonType;
  @Column({ type: 'text' })
  reason: string;
  @Column({ type: 'text' })
  photo: string;

  @Column({ type: 'mediumtext' })
  description: string;

  @OneToOne(() => PipelineItem, (pipelineItem) => pipelineItem.reason, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'pipeline_item_id' })
  pipelineItem: PipelineItem;
}
