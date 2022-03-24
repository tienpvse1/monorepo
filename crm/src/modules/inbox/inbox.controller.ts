import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateInboxDto } from './dto/create-inbox.dto';
import { UpdateInboxDto } from './dto/update-inbox.dto';
import { Inbox } from './entities/inbox.entity';
import { InboxService } from './inbox.service';

@Controller('inbox')
@Crud({
  model: {
    type: Inbox,
  },
  dto: {
    create: CreateInboxDto,
    update: UpdateInboxDto,
  },
  routes: {
    only: ['getManyBase', 'getOneBase'],
  },
  query: {
    join: {
      receiver: {},
      sender: {},
    },
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
})
@ApiTags('inbox')
export class InboxController {
  constructor(public readonly service: InboxService) {}
}
