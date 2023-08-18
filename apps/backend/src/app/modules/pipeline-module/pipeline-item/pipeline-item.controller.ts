import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from '../../../common/decorators/user.decorator';
import { AUTHORIZATION } from '../../../constant/swagger';
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

  @Post()
  @ApiBody({ type: CreateSinglePipelineItemDto })
  async addOpportunity(
    @Body() item: CreateSinglePipelineItemDto,
    @User('id', new ParseUUIDPipe({ version: '4' })) accountId: string
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
    @User('id', new ParseUUIDPipe({ version: '4' })) managerId: string
  ) {
    return this.service.createPipelineItem(item, accountId, managerId);
  }

  @Patch('change-stage/:id')
  changeStage(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() dto: ChangeStageDto
  ) {
    return this.service.changeStage(id, dto);
  }

  @Patch('assign')
  assignAccount(@Body() { id, accountId }: AssignAccountToOpportunityDto) {
    return this.service.assignAccount(id, accountId);
  }

  @Patch('restore/:id')
  restore(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.restorePipelineItem(id);
  }

  @Patch('lost/:id')
  lost(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.markAsLost(id);
  }

  @Delete(':id')
  softDelete(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.service.softDelete(id);
  }
}
