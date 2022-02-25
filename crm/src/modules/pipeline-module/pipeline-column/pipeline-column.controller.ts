import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { PipelineRepository } from '../pipeline/pipeline.repository';
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
      type: 'string',
      field: 'id',
      primary: true,
    },
    pipelineId: {
      type: 'string',
      field: 'pipelineId',
      primary: false,
    },
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase', 'getManyBase'],
  },
})
export class PipelineColumnController {
  constructor(public service: PipelineColumnService) {}

  @Post('relation/:pipelineId')
  addColumn(
    @Body() createColumnDto: CreatePipelineColumnDto,
    @Param('pipelineId', new ParseUUIDPipe()) pipelineId: string,
  ) {
    return this.service.addColumn(pipelineId, createColumnDto);
  }

  @Get('/many/:pipelineId')
  async getByPipelineID(@Param('pipelineId') pipelineId: string) {
    const pipelineRepository = getCustomRepository(PipelineRepository);
    const pipeline = await pipelineRepository.findOneItem({
      where: { id: pipelineId },
      relations: ['pipelineColumns'],
    });
    return pipeline.pipelineColumns;
  }
}
