import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
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
      type: 'uuid',
      field: 'id',
      primary: true,
    },
    pipelineId: {
      type: 'uuid',
      field: 'pipelineId',
      primary: false,
    },
  },
})
export class PipelineColumnController {
  constructor(public service: PipelineColumnService) {}

  @Post('relation/:pipelineId')
  addColumn(
    @Body() createColumnDto: CreatePipelineColumnDto,
    @Param('pipelineId') pipelineId: string,
  ) {
    return this.service.addColumn(pipelineId, createColumnDto);
  }
}
