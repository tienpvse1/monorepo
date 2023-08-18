import { Body, Controller, Get, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from '../../../common/decorators/user.decorator';
import { AUTHORIZATION } from '../../../constant/swagger';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline')
export class PipelineController {
  constructor(public service: PipelineService) {}

  @Get('own')
  getOwnPipeline(@User('id') userId: string) {
    return this.service.findOwnOnePipeline(userId);
  }

  @Post()
  createPipeline(
    @User('id', new ParseUUIDPipe({ version: '4' })) userId: string,
    @Body() dto: CreatePipelineDto
  ) {
    return this.service.createPipeline(dto, userId);
  }
}
