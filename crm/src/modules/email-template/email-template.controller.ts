import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { CreateEmailTemplateDto } from './dto/create-email-template.dto';
import { UpdateEmailTemplateDto } from './dto/update-email-template.dto';
import { ApiTags } from '@nestjs/swagger';
import { Account } from '../account/entities/account.entity';
import { User } from 'src/common/decorators/user.decorator';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';

@Controller('email-template')
@ApiTags('email-template')
export class EmailTemplateController {
  constructor(private readonly emailTemplateService: EmailTemplateService) {}

  @Post()
  create(@User('id') userId: string, @Body() email: CreateEmailTemplateDto) {
    const accountRepository = getCustomRepository(AccountRepository);
    return this.emailTemplateService.addWithRelation<Account>(
      email,
      userId,
      accountRepository,
      'emailTemplates',
    );
  }

  @Get()
  findAll() {
    return this.emailTemplateService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.emailTemplateService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmailTemplateDto: UpdateEmailTemplateDto,
  ) {
    console.log('get here');
    return this.emailTemplateService.update(id, updateEmailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.emailTemplateService.delete(id);
  }
}
