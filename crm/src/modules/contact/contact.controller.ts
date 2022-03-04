import { Controller, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { ContactService } from './contact.service';
import { CreateContactPipe } from './create-contact.pipe';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';
import { UpdateContactPipePipe } from './update-contact-pipe.pipe';

@Controller('contact')
@ApiTags('contact')
@Crud({
  model: {
    type: Contact,
  },
  dto: {
    create: CreateContactDto,
    update: UpdateContactDto,
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
  query: {
    join: {
      addresses: {},
      noteWorthies: {},
      pipelineItems: {},
    },
  },
  routes: {
    updateOneBase: {
      decorators: [
        UsePipes(UpdateContactPipePipe),
        HistoryLog('updated an contact'),
      ],
    },
    createOneBase: {
      decorators: [
        UsePipes(CreateContactPipe),
        HistoryLog('created an contact'),
      ],
    },
    createManyBase: {
      decorators: [
        UsePipes(CreateContactPipe),
        HistoryLog('imported list of contacts to system'),
      ],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted an contact')],
    },
  },
})
export class ContactController {
  constructor(public readonly service: ContactService) {}
}
