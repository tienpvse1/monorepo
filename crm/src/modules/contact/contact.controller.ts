import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, CrudController } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { ContactService } from './contact.service';
import { CreateContactPipe } from './create-contact.pipe';
import { CreateContactDto } from './dto/create-contact.dto';
import { AddTagDto, UpdateContactDto } from './dto/update-contact.dto';
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
      'pipelineItems.schedules': {},
      'pipelineItems.pipelineColumn': {},
      'pipelineItems.opportunityRevenue': {},
      'pipelineItems.opportunityRevenue.course': {},
      account: {},
      company: {},
      'account.team': {},
      tags: {},
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

    exclude: [
      'createOneBase',
      'createManyBase',
      'deleteOneBase',
      'updateOneBase',
    ],
  },
})
export class ContactController implements CrudController<Contact> {
  constructor(public readonly service: ContactService) {}
  get base(): CrudController<Contact> {
    return this;
  }

  @Get('relations')
  @ApiOperation({
    parameters: [
      {
        name: 'relations',
        in: 'query',
        schema: {
          type: 'array',
          items: {
            type: 'string',
          },
        },
      },
    ],
  })
  getRelations(@Query('relations') relations: string[]) {
    return this.service.findRelations(relations);
  }

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
  @Patch('tags/:id')
  updateContactTags(@Param('id') id: string, @Body() dto: AddTagDto) {
    return this.service.updateTags(id, dto);
  }
  @Delete(':id')
  @HistoryLog('Deleted a contact')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id, { relations: ['pipelineItems'] });
  }

  @Patch('add-tag/:id')
  addTag(@Param('id') id: string, @Body() dto: AddTagDto) {
    return this.service.addTags(id, dto);
  }
  @Patch(':id')
  updateContact(@Param('id') id: string, @Body() dto: UpdateContactDto) {
    return this.service.updateContact(id, dto);
  }
}
