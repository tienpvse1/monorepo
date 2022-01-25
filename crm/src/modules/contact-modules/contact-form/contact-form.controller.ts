import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from 'src/constance/swagger';
import { ContactFormService } from './contact-form.service';
import { UpdateContactFormDto } from './dto/update-contact-form.dto';
@Controller('contact-form')
@ApiTags('contact form')
@ApiBearerAuth(AUTHORIZATION)
export class ContactFormController {
  constructor(private readonly contactFormService: ContactFormService) {}

  @Post(':contactId')
  create(@Param('contactId') contactId: string) {
    return this.contactFormService.createForm(contactId);
  }

  @Get()
  findAll() {
    return this.contactFormService.findMany();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormService.findById(id);
  }

  @Get(':id/fields')
  findOneWithFields(@Param('id') id: string) {
    return this.contactFormService.findOne({
      where: { id },
      relations: ['contactFormFields'],
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactFormDto: UpdateContactFormDto,
  ) {
    return this.contactFormService.update(id, updateContactFormDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormService.delete(id);
  }
}
