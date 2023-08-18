import { Body, Controller, ParseUUIDPipe, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from '../../common/decorators/user.decorator';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contact')
@ApiTags('contact')
export class ContactController {
  constructor(public readonly service: ContactService) {}

  @Post()
  createOne(
    @Body() dto: CreateContactDto,
    @User('id', new ParseUUIDPipe({ version: '4' })) id: string
  ) {
    return this.service.createOneContact(dto, id);
  }
}
