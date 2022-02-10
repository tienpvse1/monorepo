import { Body, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, Override } from '@nestjsx/crud';
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
})
export class PipelineColumnController {
  constructor(public service: PipelineColumnService) {}

  @Override('createOneBase')
  create(@Body() { name, pipelineId }: CreatePipelineColumnDto) {
    const pipelineRepository = getCustomRepository(PipelineRepository);
    return this.service.addWithRelation(
      { name },
      pipelineId,
      pipelineRepository,
      'pipelineColumns',
    );
  }
}
