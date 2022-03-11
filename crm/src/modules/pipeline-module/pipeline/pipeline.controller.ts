import { Body, Controller, Get, Put, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { reIndexColumn, sortColumns } from 'src/util/pipeline';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { ValidationPipe } from './pipe/validation.pipe';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline')
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
  async getOnePipeline(@User('id') id: string) {
    const result = await this.service.findOwnOnePipeline(id);
    return {
      id: 'QIECTiuvzY',
      createdAt: '2022-02-24T10:11:45.518Z',
      updatedAt: '2022-02-24T10:12:03.000Z',
      deletedAt: null,
      name: 'pipeline 1',
      pipelineColumns: result,
    };
  }

  // @Delete('soft/:id')
  // softDelete(@Param('id') id: string) {
  //   return this.service.softDelete(id);
  // }

  @Put('/:id')
  @UsePipes(new ValidationPipe())
  @ApiOperation({
    description: "replace one pipeline by it's id",
    summary: 'replace a single pipeline',
  })
  @HistoryLog('updated the pipeline')
  async replacePipeline(
    @Body() updatePipelineDto: UpdatePipelineDto,
    @User('id') accountId: string,
  ) {
    const copiedColumns = [...updatePipelineDto.pipelineColumns];
    reIndexColumn(sortColumns(copiedColumns));
    return await this.service.updatePipeline(copiedColumns, accountId);
  }
}
