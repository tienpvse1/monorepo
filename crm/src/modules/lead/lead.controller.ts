import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { LeadService } from './lead.service';

@Controller('lead')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('lead')
@Crud({
  model: {
    type: Lead,
  },
  dto: {
    create: CreateLeadDto,
    update: UpdateLeadDto,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    createOneBase: {
      decorators: [HistoryLog('add an lead to the system')],
    },
    createManyBase: {
      decorators: [HistoryLog('add some leads to the system')],
    },
    updateOneBase: {
      decorators: [HistoryLog('updated a list information')],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted a from the system')],
    },
  },
})
export class LeadController {
  constructor(public service: LeadService) {}
}
