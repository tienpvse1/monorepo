import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { PipelineRepository } from '../pipeline/pipeline.repository';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
import { UpdatePipelineColumnDto } from './dto/update-pipeline-column.dto';
import { PipelineColumnService } from './pipeline-column.service';

@Controller('pipeline-column')
@ApiTags('pipeline columns')
@ApiBearerAuth(AUTHORIZATION)
export class PipelineColumnController {
  constructor(private readonly pipelineColumnService: PipelineColumnService) {}

  @Post()
  create(@Body() { name, pipelineId }: CreatePipelineColumnDto) {
    const pipelineRepository = getCustomRepository(PipelineRepository);
    return this.pipelineColumnService.addWithRelation(
      { name },
      pipelineId,
      pipelineRepository,
      'pipelineColumns',
    );
  }

  @Get()
  findAll() {
    return this.pipelineColumnService.findMany({});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineColumnService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineColumnDto: UpdatePipelineColumnDto,
  ) {
    return this.pipelineColumnService.update(id, updatePipelineColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineColumnService.delete(id);
  }
}
