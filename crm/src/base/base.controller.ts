import {
  Body,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeepPartial, FindManyOptions } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './base.repository';
import { CRUDService } from './base.service';
import { BaseEntity } from './entity.base';

export class BaseController<
  Entity extends BaseEntity,
  CreateDto extends DeepPartial<Entity>,
  UpdateDto extends QueryDeepPartialEntity<Entity>,
  Repository extends BaseRepository<Entity>,
  Service extends CRUDService<Entity, Repository>,
> {
  protected service: Service;
  constructor(service: Service) {
    this.service = service;
  }

  @Post()
  create(@Body() createDto: CreateDto) {
    return this.service.create(createDto);
  }

  @Get('index')
  findAll() {
    return this.service.findMany();
  }

  @Get('')
  paginate(
    @Body() query: FindManyOptions<Entity>,
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
  ) {
    return this.service.paginate(query, num, size);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdateDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  softDelete(@Param('id') id: string) {
    return this.service.delete(id);
  }

  /**
   * Permanent delete
   */
  @Delete('permanent/:id')
  permanentDelete(@Param('id') id: string) {
    return this.permanentDelete(id);
  }
}
