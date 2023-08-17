import { BadRequestException, NotFoundException } from '@nestjs/common';
import {
  DeepPartial,
  EntityRepository,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './entity.base';

@EntityRepository()
export class BaseRepository<T extends BaseEntity> extends Repository<T> {
  async createItem(item: DeepPartial<T>) {
    try {
      const newItem = this.create(item);
      const createResult = await newItem.save();
      return createResult;
    } catch (error) {
      throw new BadRequestException(`cannot create ${this.metadata.name}`);
    }
  }

  async findById(id: string) {
    try {
      const item = this.findOne(id);
      if (!item) throw new NotFoundException();
      return item;
    } catch (error) {
      throw new NotFoundException();
    }
  }

  async findMany(filter: FindManyOptions<T>) {
    try {
      const items = await this.find(filter);
      return items;
    } catch (error) {
      throw new BadRequestException('cannot find with condition provided');
    }
  }

  async findOneItem(filter: FindOneOptions<T>) {
    try {
      const item = await this.findOne(filter);
      if (!item) throw new NotFoundException();
      return item;
    } catch (error) {
      throw new NotFoundException(`cannot find ${this.metadata.name}`);
    }
  }

  async deleteItem(id: string) {
    try {
      const deleteResult = await this.softDelete(id);
      return deleteResult;
    } catch (error) {
      throw new NotFoundException(`cannot delete ${this.metadata.name}`);
    }
  }

  async permanentDelete(id: string) {
    try {
      const deleteResult = await this.delete(id);
      return deleteResult;
    } catch (error) {
      throw new NotFoundException(`cannot delete ${this.metadata.name}`);
    }
  }

  async updateItem(id: string, item: QueryDeepPartialEntity<T>) {
    try {
      const foundItem = await this.findById(id);
      if (!foundItem) throw new NotFoundException('item not found');
      Object.assign(foundItem, item);
      const updateResult = await foundItem.save();
      return updateResult;
    } catch (error) {
      throw new NotFoundException(`cannot update ${this.metadata.name}`);
    }
  }
}
