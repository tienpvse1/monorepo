import { BaseEntity } from 'src/base/entity.base';
import { Company } from 'src/modules/company/entities/company.entity';
import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity()
export class Tag extends BaseEntity {
  @Column()
  name: string;
  @Column()
  color: string;

  @ManyToMany(() => PipelineItem, (pipelineItem) => pipelineItem.tags)
  @JoinTable({
    name: 'tag_pipeline_item',
    joinColumn: { name: 'pipeline_item_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  pipelineItems: PipelineItem[];

  @ManyToMany(() => Company, (company) => company.tags)
  @JoinTable({
    name: 'tag_company',
    joinColumn: { name: 'company_id' },
    inverseJoinColumn: { name: 'tag_id' },
  })
  companies: Company[];
}
