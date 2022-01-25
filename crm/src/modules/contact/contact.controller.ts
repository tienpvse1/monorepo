import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FindManyOptions } from 'typeorm';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from './entities/contact.entity';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @Get()
  findAll(
    @Body() query: FindManyOptions<Contact>,
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
  ) {
    return this.contactService.paginate(query, num, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactService.findById(id);
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
