import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { InjectKnex, Knex } from 'nestjs-knex';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { InternalServerEvent } from 'src/constance/event';
import { AUTHORIZATION } from 'src/constance/swagger';
import { InternalSendNotificationPayload } from 'src/modules/notification/dto/internal-send-notification.dto';
import { CreateOpportunityRevenueDto } from 'src/modules/opportunity-revenue/dto/create-opportunity-revenue.dto';
import { AssignAccountToOpportunityDto } from './dto/assign-account.dto';
import {
  CreatePipelineItemDto,
  CreateSinglePipelineItemDto,
  CreateSinglePipelineItemManagerDto,
} from './dto/create-pipeline-item.dto';
import {
  ChangeStageDto,
  UpdatePipelineItemDto,
} from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';
import { GenerateNestedIdPipe } from './generate-nested-id.pipe';
import { PipelineItemService } from './pipeline-item.service';
@Controller('pipeline-item')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline item')
@Crud({
  model: {
    type: PipelineItem,
  },
  dto: {
    create: CreatePipelineItemDto,
    update: UpdatePipelineItemDto,
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    exclude: ['createOneBase', 'deleteOneBase', 'updateOneBase'],
    updateOneBase: {
      decorators: [UsePipes(GenerateNestedIdPipe)],
    },
  },

  query: {
    join: {
      account: {},
      contact: {},
      discountCode: {},
      tags: {},
      schedules: {},
      noteWorthies: {},
      pipelineColumn: {},
      opportunityRevenue: {},
      reason: {},
      'account.team': {},
      'opportunityRevenue.product': {},
      'opportunityRevenue.course': {},
      'contact.company': { alias: 'companyCity' },
      'contact.company.city': {},
    },
  },
})
export class PipelineItemController {
  constructor(
    public service: PipelineItemService,
    private eventEmitter: EventEmitter2,
    @InjectKnex() private knex: Knex,
  ) {}

  @Post()
  @UsePipes(GenerateNestedIdPipe)
  @HistoryLog('Add a new opportunity')
  @ApiBody({ type: CreateSinglePipelineItemDto })
  async addOpportunity(
    @Body() item: CreateSinglePipelineItemDto,
    @User('id') accountId: string,
  ) {
    const result = await this.service.createPipelineItemForSale(
      item,
      accountId,
    );
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);
    return result;
  }
  @Post('manager')
  @UsePipes(GenerateNestedIdPipe)
  @HistoryLog('Add a new opportunity for manager')
  @ApiBody({ type: CreateSinglePipelineItemManagerDto })
  async addOpportunityForManager(
    @Body() { accountId, ...item }: CreateSinglePipelineItemManagerDto,
    @User('id') managerId: string,
  ) {
    await this.service.createPipelineItem(item, accountId, managerId);
    const payload: InternalSendNotificationPayload = {
      description: 'assigned you to an opportunity',
      name: 'Assignment',
      receiverId: accountId,
      senderId: managerId,
    };
    this.eventEmitter.emit(InternalServerEvent.SEND_NOTIFICATION, payload);
    this.eventEmitter.emit(InternalServerEvent.PIPELINE_UPDATED);

    return item;
  }

  @Patch('change-stage/:id')
  @HistoryLog("change the opportunity's stage")
  changeStage(@Param('id') id: string, @Body() dto: ChangeStageDto) {
    return this.service.changeStage(id, dto);
  }
  @Patch('assign')
  @HistoryLog('assign an opportunity')
  assignAccount(
    @Body() { id, accountId }: AssignAccountToOpportunityDto,
    @User('id') managerId: string,
  ) {
    return this.service.assignAccount(id, accountId, managerId);
  }
  @Patch('reassign')
  @HistoryLog('Reassign an opportunity')
  reassignAccount(
    @Body() { id, accountId }: AssignAccountToOpportunityDto,
    @User('id') managerId: string,
  ) {
    return this.service.reassign(id, accountId, managerId);
  }

  @Delete(':id')
  @HistoryLog('Deleted an opportunity')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id, { relations: ['reason'] });
  }

  @Patch('lose/:id')
  lose(@Param('id') id: string) {
    return this.service.update(id, {
      isLose: true,
    });
  }
  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restorePipelineItem(id);
  }
  @Patch(':id')
  async updatePipelineItem(
    @Param('id') id: string,
    @Body() dto: UpdatePipelineItemDto,
  ) {
    if (dto.opportunityRevenue) {
      const { id, ...rest } =
        dto.opportunityRevenue as CreateOpportunityRevenueDto & {
          id: string;
        };
      await this.knex('opportunity_revenue')
        .update({
          course_id: rest.courseId,
          quantity: rest.quantity,
        })
        .where({ id });
    }
    delete dto.opportunityRevenue;
    return this.service.update(id, dto);
  }
}
