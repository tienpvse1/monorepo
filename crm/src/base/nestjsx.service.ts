/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, FindOneOptions, In, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './base.repository';
import { BaseEntity } from './entity.base';
import { merge } from 'lodash';
export class BaseService<Entity> extends TypeOrmCrudService<Entity> {
  repository: Repository<Entity>;
  constructor(modal: Repository<Entity>) {
    super(modal);
    this.repository = modal;
  }

  async createItem(item: DeepPartial<Entity>) {
    try {
      const newItem = this.repository.create(item);
      const createdItem = await this.repository.save(newItem);
      return createdItem;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async safeUpdate(id: string, item: QueryDeepPartialEntity<Entity>) {
    const foundItem = await this.repository.findOne(id);
    if (!foundItem) throw new NotFoundException(`${this.dbName} not found`);
    merge(foundItem, item);
    return this.repository.save(foundItem);
  }

  async softDelete(id: string, condition?: FindOneOptions<Entity>) {
    const item = await this.findOne(id, condition);
    return this.repository.softRemove(item);
  }

  async findOneItem(filter: FindOneOptions<Entity>) {
    try {
      const item = await this.findOne(filter);
      if (!item) throw new NotFoundException('item with condition not found');
      return item;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async findOneWithoutError(filter: FindOneOptions<Entity>) {
    return this.repository.findOne(filter);
  }

  async addWithRelation<RelationEntity extends BaseEntity>(
    item: DeepPartial<Entity>,
    relationEntityId: string,
    relateRepository: BaseRepository<RelationEntity>,
    field: keyof RelationEntity,
  ) {
    try {
      const relateItem = await relateRepository.findOneItem({
        where: {
          id: relationEntityId,
        },
        relations: [field.toString()],
      });
      const newItem = this.repository.create(item);
      const createdItem = await this.repository.save(newItem);
      // @ts-ignore
      if (!relateItem[field]) relateItem[field] = [];
      // @ts-ignore
      relateItem[field].push(createdItem);
      const savedResult = await relateItem.save();
      return savedResult;
    } catch (error) {
      throw new BadRequestException('unable to create this item');
    }
  }

  async addManyWithRelation<RelationEntity extends BaseEntity>(
    item: DeepPartial<Entity>,
    relationEntityIds: string[],
    relateRepository: Repository<RelationEntity>,
    thisField: keyof Entity,
  ) {
    try {
      const relateItems = await relateRepository.find({
        where: {
          id: In(relationEntityIds),
        },
      });

      const newItem = this.repository.create(item);

      // @ts-ignore
      newItem[thisField] = relateItems;
      return await this.repository.save(newItem);
    } catch (error) {
      throw new BadRequestException('unable to create this item');
    }
  }
}
