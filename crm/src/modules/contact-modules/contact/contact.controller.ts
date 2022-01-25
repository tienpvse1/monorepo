import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { FindManyOptions } from 'typeorm';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact-module')
@ApiTags('contact module')
@ApiBearerAuth(AUTHORIZATION)
export class ContactController {
  constructor(private contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get('paginate')
  paginate(
    @Query('num', ParseIntPipe, new DefaultValuePipe(1)) num = 1,
    @Query('size', ParseIntPipe, new DefaultValuePipe(10)) size = 10,
    @Body() filter: FindManyOptions<Contact>,
  ) {
    return this.contactService.paginate(filter, num, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findById(id);
  }
  @Get(':id/form')
  findOneWithForm(@Param('id') id: string) {
    return this.contactService.findOne({
      where: { id },
      relations: ['contactForm'],
    });
  }
  @Get(':id/form/fields')
  findOneWithFormAndFields(@Param('id') id: string) {
    return this.contactService.findOne({
      where: { id },
      relations: ['contactForm', 'contactForm.contactFormFields'],
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(id, updateContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactService.delete(id);
  }
}
