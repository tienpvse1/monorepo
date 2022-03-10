import { Body, Controller, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import {
  CreatePipelineItemDto,
  CreateSinglePipelineItemDto,
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
    exclude: ['createOneBase'],
    updateOneBase: { decorators: [UsePipes(GenerateNestedIdPipe)] },
    deleteOneBase: { decorators: [HistoryLog('deleted an opportunity')] },
  },
  query: {
    join: {
      account: {},
      contact: {},
      tags: {},
      schedules: {},
      noteWorthies: {},
      pipelineColumn: {},
      opportunityRevenue: {},
      'opportunityRevenue.product': {},
    },
  },
})
export class PipelineItemController {
  constructor(public service: PipelineItemService) {}

  @Post()
  @UsePipes(GenerateNestedIdPipe)
  @HistoryLog('Add a new opportunity')
  @ApiBody({ type: CreateSinglePipelineItemDto })
  addOpportunity(
    @Body() item: CreateSinglePipelineItemDto,
    @User('id') accountId: string,
  ) {
    this.service.createPipelineItem(item, accountId);

    return item;
  }

  @Patch('change-stage/:id')
  @HistoryLog("change the opportunity's stage")
  changeStage(@Param('id') id: string, @Body() dto: ChangeStageDto) {
    return this.service.changeStage(id, dto);
  }
}
