import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('tag')
export class TagController {
  constructor(public readonly service: TagService) {}

  @Get()
  tags() {
    return this.service.findAllTags();
  }

  @Post()
  create(@Body() dto: CreateTagDto) {
    return this.service.createTag(dto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
