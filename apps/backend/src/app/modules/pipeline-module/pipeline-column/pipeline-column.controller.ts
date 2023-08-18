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
import { AUTHORIZATION } from '../../../constant/swagger';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
import { PipelineColumnService } from './pipeline-column.service';

@Controller('pipeline-column')
@ApiTags('pipeline columns')
@ApiBearerAuth(AUTHORIZATION)
export class PipelineColumnController {
  constructor(public service: PipelineColumnService) {}

  @Post('relation')
  @ApiOperation({ deprecated: true })
  addColumn(@Body() createColumnDto: CreatePipelineColumnDto) {
    return this.service.addColumn(createColumnDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }

  @Patch('set-won/:pipelineId/:id')
  @ApiOperation({
    summary: 'mark an column as won stage',
    description:
      'if there is another column is set as won in database, its "isWon" field will be updated into false and set this stage as won instead',
  })
  updateWon(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Param('pipelineId', new ParseUUIDPipe({ version: '4' }))
    pipelineId: string
  ) {
    return this.service.setWon(id, pipelineId);
  }
}
