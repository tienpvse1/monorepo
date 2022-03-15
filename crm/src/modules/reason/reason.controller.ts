import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { CreateReasonDto } from './dto/create-reason.dto';
import { UpdateReasonDto } from './dto/update-reason.dto';
import { Reason } from './entities/reason.entity';
import { ReasonService } from './reason.service';

@Controller('reason')
@Crud({
  model: {
    type: Reason,
  },
  dto: {
    create: CreateReasonDto,
    update: UpdateReasonDto,
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
  query: {
    join: {
      pipelineItem: {},
    },
  },
  routes: {
    exclude: ['createOneBase', 'deleteOneBase'],
  },
})
@ApiTags('reason')
export class ReasonController {
  constructor(public service: ReasonService) {}

  @Post()
  create(@Body() dto: CreateReasonDto) {
    return this.service.create(dto);
  }

  @Delete(':id')
  @HistoryLog('deleted a lost reason')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
