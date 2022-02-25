import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import {
  CreatePipelineItemDto,
  CreateSinglePipelineItemDto,
} from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';
import { GenerateNestedIdPipe } from './generate-nested-id.pipe';
import { ParseDtoPipe } from './parse-dto.pipe';
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
  },
  query: {
    join: {
      account: {},
      contact: {},
      tags: {},
      schedules: {},
      addresses: {},
      noteWorthies: {},
      pipelineColumn: {},
    },
  },
})
export class PipelineItemController {
  constructor(public service: PipelineItemService) {}

  @Post()
  @UsePipes(GenerateNestedIdPipe, ParseDtoPipe)
  @ApiBody({ type: CreateSinglePipelineItemDto })
  addOpportunity(@Body() item: any) {
    return item;
  }
}
