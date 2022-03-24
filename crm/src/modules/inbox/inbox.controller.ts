import { Controller } from '@nestjs/common';
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
})
export class InboxController {
  constructor(public readonly service: InboxService) {}
}
