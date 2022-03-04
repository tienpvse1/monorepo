import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplate } from './entities/email-template.entity';

@Controller('email-template')
@ApiTags('email-template')
@Crud({
  model: {
    type: EmailTemplate,
  },
  dto: {
    create: CreateEmailTemplateDto,
    update: UpdateEmailTemplateDto,
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  routes: {
    createOneBase: {
      decorators: [HistoryLog('add an drafted email template ')],
    },
    updateOneBase: {
      decorators: [HistoryLog('updated an drafted email template')],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted an drafted email template')],
    },
  },
})
export class EmailTemplateController {
  constructor(public service: EmailTemplateService) {}

  @Post()
  create(@User('id') userId: string, @Body() email: CreateEmailTemplateDto) {
    const accountRepository = getCustomRepository(AccountRepository);
    return this.service.addWithRelation<Account>(
      email,
      userId,
      accountRepository,
      'emailTemplates',
    );
  }
}
