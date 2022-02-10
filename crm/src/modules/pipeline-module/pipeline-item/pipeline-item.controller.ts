import { Body, Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud, Override } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { PipelineColumn } from '../pipeline-column/entities/pipeline-column.entity';
import { PipelineColumnRepository } from '../pipeline-column/pipeline-column.repository';
import { CreatePipelineItemDto } from './dto/create-pipeline-item.dto';
import { UpdatePipelineItemDto } from './dto/update-pipeline-item.dto';
import { PipelineItem } from './entities/pipeline-item.entity';
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
})
export class PipelineItemController {
  constructor(public service: PipelineItemService) {}

  @Override('createOneBase')
  create(@Body() createPipelineItemDto: CreatePipelineItemDto) {
    const pipelineColumnRepository = getCustomRepository(
      PipelineColumnRepository,
    );

    const { name, pipelineColumnId } = createPipelineItemDto;

    return this.service.addWithRelation<PipelineColumn>(
      { name },
      pipelineColumnId,
      pipelineColumnRepository,
      'pipelineItems',
    );
  }
}
