import { resolve } from '@monorepo/common';
import { ParseUUIDPipe } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../../../common/decorators/user.decorator';
import { InjectKysely, Kysely } from '../../../kysely';
import { AccountGql } from '../../account/gql/account.gql';
import { PipelineColumnGql } from '../pipeline-column/gql/pipeline-column.gql';
import { AssignAccountToOpportunityDto } from './dto/assign-account.dto';
import {
  CreateSinglePipelineItemDto,
  CreateSinglePipelineItemManagerDto,
} from './dto/create-pipeline-item.dto';
import { ChangeStageDto } from './dto/update-pipeline-item.dto';
import { PipelineItemGql } from './gql/pipeline-item.gql';
import { PipelineItemService } from './pipeline-item.service';

@Resolver(() => PipelineItemGql)
export class PipelineItemResolver {
  constructor(
    private readonly service: PipelineItemService,
    @InjectKysely private readonly kysely: Kysely
  ) {}

  @Query(() => [PipelineItemGql], { defaultValue: [] })
  pipelineItems(@User('id') accountId: string) {
    return this.service.findOwnPipelineItems(accountId);
  }

  @Mutation(() => PipelineItemGql)
  async addOpportunity(
    @Args('input') item: CreateSinglePipelineItemDto,
    @User('id', new ParseUUIDPipe({ version: '4' })) accountId: string
  ) {
    const result = await this.service.createPipelineItemForSale(
      item,
      accountId
    );
    return result;
  }

  @Mutation(() => PipelineItemGql)
  async addOpportunityForManager(
    @Args('input') { accountId, ...item }: CreateSinglePipelineItemManagerDto,
    @User('id', new ParseUUIDPipe({ version: '4' })) managerId: string
  ) {
    return this.service.createPipelineItem(item, accountId, managerId);
  }

  @Mutation(() => PipelineItemGql)
  changeStage(@Args('input') dto: ChangeStageDto) {
    return this.service.changeStage(dto);
  }

  @Mutation(() => PipelineItemGql)
  assignAccount(
    @Args('input') { id, accountId }: AssignAccountToOpportunityDto
  ) {
    return this.service.assignAccount(id, accountId);
  }

  @Mutation(() => PipelineItemGql)
  restore(@Args('id', new ParseUUIDPipe()) id: string) {
    return this.service.restorePipelineItem(id);
  }

  @Mutation(() => PipelineItemGql)
  lost(@Args('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.markAsLost(id);
  }

  @Mutation(() => PipelineItemGql)
  softDelete(@Args('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.softDelete(id);
  }

  @ResolveField(() => [AccountGql], { nullable: true })
  async accounts(@Parent() pipelineItem: PipelineItemGql) {
    const findFn = this.kysely
      .selectFrom('account')
      .leftJoin('accountPipeline', 'accountPipeline.accountId', 'account.id')
      .where('accountPipeline.pipelineId', '=', pipelineItem.id)
      .selectAll()
      .execute();
    const [accounts, error] = await resolve(findFn);
    if (error) return [];
    return accounts.map((account) => {
      delete account.password;
      return account;
    });
  }

  @ResolveField(() => PipelineColumnGql)
  pipelineColumn(@Parent() pipelineItem: PipelineItemGql) {
    return this.kysely
      .selectFrom('pipelineColumn')
      .selectAll()
      .where('id', '=', pipelineItem.pipelineColumnId)
      .executeTakeFirst();
  }
}
