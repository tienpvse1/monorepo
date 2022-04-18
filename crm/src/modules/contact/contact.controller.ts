import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { Public } from 'src/common/decorators/public.decorator';
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
export class ContactController {
  constructor(public readonly service: ContactService) {}

  @Public()
  @Get('in-date')
  getInDate() {
    return this.service.repository
      .createQueryBuilder('contact')
      .where('Month(birth) = :month', { month: new Date().getMonth() + 1 })
      .andWhere('Day(birth) = :day', { day: new Date().getDate() })
      .leftJoinAndSelect('contact.pipelineItems', 'pipelineItems')
      .leftJoinAndSelect('pipelineItems.account', 'account')
      .getMany();
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
