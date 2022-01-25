import { BaseEntity } from 'src/base/entity.base';
import { Account } from 'src/modules/account/entities/account.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { PipelineColumn } from '../../pipeline-column/entities/pipeline-column.entity';

@Entity({ name: 'pipeline' })
export class Pipeline extends BaseEntity {
  @Column()
  name: string;

  @OneToOne(() => Account, (account) => account.pipeline)
  @JoinColumn({ name: 'account_id' })
  account: Account;

  @OneToMany(
    () => PipelineColumn,
    (pipelineColumn) => pipelineColumn.pipeline,
    { eager: true },
  )
  pipelineColumns: PipelineColumn[];
}
