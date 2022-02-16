import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateHistoryDto } from './dto/create-history.dto';
import { UpdateHistoryDto } from './dto/update-history.dto';
import { History } from './entities/history.entity';
import { HistoryService } from './history.service';

@Controller('history')
@ApiTags('history')
@Crud({
  model: {
    type: History,
  },
  dto: {
    create: CreateHistoryDto,
    update: UpdateHistoryDto,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
})
export class HistoryController {
  constructor(public readonly service: HistoryService) {}
}
