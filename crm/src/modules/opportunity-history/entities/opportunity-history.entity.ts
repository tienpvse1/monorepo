import { BaseEntity } from 'src/base/entity.base';
import { PipelineColumn } from 'src/modules/pipeline-module/pipeline-column/entities/pipeline-column.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

export enum HistoryType {
  CREATE = 'create',
  CHANGE_STATE = 'change-state',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Entity({ name: 'opportunity_history' })
export class OpportunityHistory extends BaseEntity {
  @Column({ nullable: true })
  description?: string;
  @Column({
    type: 'enum',
    enum: HistoryType,
    default: HistoryType.CHANGE_STATE,
    name: 'history_type',
  })
  type: string;
  @ManyToOne(() => PipelineColumn, (stage) => stage.source)
  @JoinColumn({ name: 'old_stage_id' })
  oldStage: PipelineColumn;
  @ManyToOne(() => PipelineColumn, (stage) => stage.destination)
  @JoinColumn({ name: 'new_stage_id' })
  newStage: PipelineColumn;
  @ManyToOne(() => PipelineItem, (pipelineItem) => pipelineItem.histories)
  @JoinColumn({ name: 'opportunity_id' })
  pipelineItem: PipelineItem;
}
