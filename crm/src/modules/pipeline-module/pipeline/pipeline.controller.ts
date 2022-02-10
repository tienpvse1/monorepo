import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';
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
  },
})
export class PipelineController {
  constructor(public service: PipelineService) {}
  // @Override('getOneBase')
  // getOneItem(@User('id') userId: string) {
  //   return this.service.findOwnOnePipeline(userId);
  // }
  @Get('own')
  getOwnPipeline(@User('id') userId: string) {
    return this.service.findOwnOnePipeline(userId);
  }
}
