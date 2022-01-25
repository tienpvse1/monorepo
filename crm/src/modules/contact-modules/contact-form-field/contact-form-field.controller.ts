import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { ContactFormRepository } from '../contact-form/contact-form.repository';
import { ContactForm } from '../contact-form/entities/contact-form.entity';
import { ContactFormFieldService } from './contact-form-field.service';
import { CreateContactFormFieldDto } from './dto/create-contact-form-field.dto';
import { UpdateContactFormFieldDto } from './dto/update-contact-form-field.dto';

@Controller('contact-form-field')
@ApiTags('contact form field')
@ApiBearerAuth(AUTHORIZATION)
export class ContactFormFieldController {
  constructor(
    private readonly contactFormFieldService: ContactFormFieldService,
  ) {}

  @Post(':parentId')
  create(
    @Body() createContactFormFieldDto: CreateContactFormFieldDto,
    @Param('parentId') parentId: string,
  ) {
    const contactFormRepository = getCustomRepository(ContactFormRepository);
    return this.contactFormFieldService.addWithRelation<ContactForm>(
      createContactFormFieldDto,
      parentId,
      contactFormRepository,
      'contactFormFields',
    );
  }

  @Get()
  findAll() {
    return this.contactFormFieldService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormFieldService.findById(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactFormFieldDto: UpdateContactFormFieldDto,
  ) {
    return this.contactFormFieldService.update(id, updateContactFormFieldDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormFieldService.delete(id);
  }
}
