import { Controller, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { ContactService } from './contact.service';
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
    },
  },
  routes: {
    updateOneBase: { decorators: [UsePipes(UpdateContactPipePipe)] },
  },
})
export class ContactController {
  constructor(public readonly service: ContactService) {}
}
