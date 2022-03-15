import {
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import {
  CreatePipelineColumnDto,
  CreateSinglePipelineColumnDto,
} from './dto/create-pipeline-column.dto';
import { UpdatePipelineColumnDto } from './dto/update-pipeline-column.dto';
import { PipelineColumn } from './entities/pipeline-column.entity';
import { PipelineColumnService } from './pipeline-column.service';

@Controller('pipeline-column')
@ApiTags('pipeline columns')
@ApiBearerAuth(AUTHORIZATION)
@Crud({
  model: {
    type: PipelineColumn,
  },
  dto: {
    create: CreatePipelineColumnDto,
    update: UpdatePipelineColumnDto,
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'deleteOneBase'],
    updateOneBase: {
      decorators: [HistoryLog('updated an stage')],
    },
  },
  query: {
    join: {
      pipelineItems: {},
      'pipelineItems.contact': {},
      'pipelineItems.account': {},
      'pipelineItems.schedules': {},
      'pipelineItems.reason': {},
    },
  },
})
export class PipelineColumnController {
  constructor(public service: PipelineColumnService) {}

  @Post('relation/:pipelineId')
  @ApiOperation({ deprecated: true })
  addColumn(
    @Body() createColumnDto: CreatePipelineColumnDto,
    @Param('pipelineId', new ParseUUIDPipe()) pipelineId: string,
  ) {
    return this.service.addColumn(pipelineId, createColumnDto);
  }

  @Post()
  @HistoryLog('add a new stage to the pipeline')
  @ApiOperation({
    summary: 'simply add a new column to the end of pipeline',
  })
  addSingleColumn(@Body() dto: CreateSinglePipelineColumnDto) {
    return this.service.addSingleColumn(dto);
  }

  @Delete(':id')
  @HistoryLog('Deleted an stage')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Patch('set-won/:id')
  @ApiOperation({
    summary: 'mark an column as won stage',
    description:
      'if there is another column is set as won in database, its "isWon" field will be updated into false and set this stage as won instead',
  })
  updateWon(@Param('id') id: string) {
    return this.service.setWon(id);
  }
}
