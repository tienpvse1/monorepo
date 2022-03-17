import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
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
      noteWorthies: {},
      pipelineItems: {},
      account: {},
      company: {},
      'account.team': {},
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

    exclude: ['createOneBase', 'createManyBase', 'deleteOneBase'],
  },
})
export class ContactController {
  constructor(public readonly service: ContactService) {}

  @Post()
  createOne(@Body() dto: CreateContactDto, @User('id') id: string) {
    return this.service.createOneContact(dto, id);
  }

  @Post('/bulk')
  @ApiBody({ type: [CreateContactDto] })
  createMany(
    @Body() dto: { bulk: CreateContactDto[] },
    @User('id') accountId: string,
  ) {
    return this.service.createManyContact(dto, accountId);
  }

  @Delete(':id')
  @HistoryLog('Deleted a contact')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
