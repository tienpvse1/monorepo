import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '../../../common/decorators/user.decorator';
import { AUTHORIZATION } from '../../../constant/swagger';
import { InternalSendNotificationPayload } from '../../notification/dto/internal-send-notification.dto';
import { AssignAccountToOpportunityDto } from './dto/assign-account.dto';
import {
  CreateSinglePipelineItemDto,
  CreateSinglePipelineItemManagerDto,
} from './dto/create-pipeline-item.dto';
import { ChangeStageDto } from './dto/update-pipeline-item.dto';
import { PipelineItemService } from './pipeline-item.service';

@Controller('pipeline-item')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline item')
export class PipelineItemController {
  constructor(public service: PipelineItemService) {}

  /**
   * things to implement:
   * - soft delete pipeline item
   * - reassign opportunity to sale
   * - mark opportunity as lost
   */
  @Post()
  @ApiBody({ type: CreateSinglePipelineItemDto })
  async addOpportunity(
    @Body() item: CreateSinglePipelineItemDto,
    @User('id') accountId: string
  ) {
    const result = await this.service.createPipelineItemForSale(
      item,
      accountId
    );
    return result;
  }

  @Post('manager')
  @ApiBody({ type: CreateSinglePipelineItemManagerDto })
  async addOpportunityForManager(
    @Body() { accountId, ...item }: CreateSinglePipelineItemManagerDto,
    @User('id') managerId: string
  ) {
    if (!accountId) accountId = managerId;
    await this.service.createPipelineItem(item, accountId, managerId);
    const payload: InternalSendNotificationPayload = {
      description: 'assigned you to an opportunity',
      name: 'Assignment',
      receiverId: accountId,
      senderId: managerId,
    };

    return item;
  }

  @Patch('change-stage/:id')
  changeStage(@Param('id') id: string, @Body() dto: ChangeStageDto) {
    return this.service.changeStage(id, dto);
  }

  @Patch('assign')
  assignAccount(
    @Body() { id, accountId }: AssignAccountToOpportunityDto,
    @User('id') managerId: string
  ) {
    return this.service.assignAccount(id, accountId, managerId);
  }

  @Patch('restore/:id')
  restore(@Param('id') id: string) {
    return this.service.restorePipelineItem(id);
  }
}
