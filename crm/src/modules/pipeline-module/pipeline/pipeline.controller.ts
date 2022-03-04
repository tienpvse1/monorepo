import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';
import { CreatePipePipe } from './pipe/create-pipe.pipe';
import { ValidationPipe } from './pipe/validation.pipe';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline')
@Crud({
  model: {
    type: Pipeline,
  },
  dto: {
    create: CreatePipelineDto,
    update: UpdatePipelineDto,
    replace: UpdatePipelineDto,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  query: {
    join: {
      pipelineColumns: {},
      'pipelineColumns.pipelineItems': {
        alias: 'columnItems',
      },
    },
  },
  routes: {
    exclude: [
      'replaceOneBase',
      'createManyBase',
      'getOneBase',
      'createOneBase',
      'getManyBase',
    ],
    deleteOneBase: {
      decorators: [HistoryLog('deleted a pipeline')],
    },
  },
})
export class PipelineController {
  constructor(public service: PipelineService) {}

  @Get('own')
  @ApiOperation({
    deprecated: true,
    summary:
      'no relationship between account and pipeline anymore, please use GET api/v1/pipeline',
  })
  getOwnPipeline(@User('id') userId: string) {
    return this.service.findOwnOnePipeline(userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Retrieve ONLY one pipeline that exist in the system',
  })
  getOnePipeline() {
    return this.service.findOneItem({
      relations: ['pipelineColumns', 'pipelineColumns.pipelineItems'],
    });
  }

  @Post()
  @ApiOperation({
    deprecated: true,
    summary: 'System should not let user to create pipeline',
    description:
      'please do not use this api, because system should only have one pipeline by default, should not let user to do this manually',
  })
  @UsePipes(CreatePipePipe)
  createPipeline(@Body() value: CreatePipelineDto) {
    return this.service.createItem(value);
  }

  @Delete('soft/:id')
  softDelete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    description: "replace one pipeline by it's id",
    summary: 'replace a single pipeline',
  })
  @HistoryLog('updated the pipeline')
  replacePipeline(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.service.updatePipeline(id, updatePipelineDto);
  }
}
