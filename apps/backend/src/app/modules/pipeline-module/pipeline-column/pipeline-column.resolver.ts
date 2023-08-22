import { ParseUUIDPipe } from '@nestjs/common';
import { Args, Mutation, Parent, Resolver } from '@nestjs/graphql';
import { InjectKysely, Kysely } from '../../../kysely';
import { PipelineItemGql } from '../pipeline-item/gql/pipeline-item.gql';
import { PipelineGql } from '../pipeline/gql/pipeline.gql';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
import { PipelineColumnGql } from './gql/pipeline-column.gql';
import { PipelineColumnService } from './pipeline-column.service';

@Resolver(() => PipelineColumnGql)
export class PipelineColumnResolver {
  constructor(
    public service: PipelineColumnService,
    @InjectKysely private readonly kysely: Kysely
  ) {}

  @Mutation(() => PipelineColumnGql)
  addColumn(@Args('input') createColumnDto: CreatePipelineColumnDto) {
    return this.service.addColumn(createColumnDto);
  }

  @Mutation(() => PipelineColumnGql)
  deleteColumn(@Args('id') id: string) {
    return this.service.softDelete(id);
  }

  @Mutation(() => PipelineColumnGql)
  updateWon(@Args('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.setWon(id);
  }

  @Mutation(() => [PipelineItemGql], { defaultValue: [] })
  pipelineItems(@Parent() pipelineColumn: PipelineColumnGql) {
    return this.kysely
      .selectFrom('pipelineItem')
      .where('pipelineColumnId', '=', pipelineColumn.id)
      .selectAll()
      .execute();
  }

  @Mutation(() => PipelineGql)
  pipeline(@Parent() pipelineColumn: PipelineColumnGql) {
    return this.kysely
      .selectFrom('pipelineColumn')
      .leftJoin('pipeline', 'pipelineColumn.pipelineId', 'pipeline.id')
      .where('pipelineColumn.id', '=', pipelineColumn.id)
      .selectAll('pipeline')
      .executeTakeFirst();
  }
}
