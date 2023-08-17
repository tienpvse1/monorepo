/* eslint-disable @typescript-eslint/ban-ts-comment */
import { BadRequestException } from '@nestjs/common';
import { paginate } from 'nestjs-typeorm-paginate';
import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  getConnection,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseRepository } from './base.repository';
import { BaseEntity } from './entity.base';

export class CRUDService<
  Entity extends BaseEntity,
  Repository extends BaseRepository<Entity>,
> {
  protected repository: Repository;

  constructor(repository: Repository) {
    this.repository = repository;
  }

  create(item: DeepPartial<Entity>) {
    return this.repository.createItem(item);
  }

  findById(id: string) {
    return this.repository.findById(id);
  }

  findOne(filter: FindOneOptions<Entity>) {
    return this.repository.findOneItem(filter);
  }

  findOneWithoutError(filter: FindOneOptions<Entity>) {
    return this.repository.findOne(filter);
  }

  findMany(filter: FindManyOptions<Entity> = {}) {
    return this.repository.findMany(filter);
  }

  paginate(filter: FindManyOptions<Entity>, num: number, size: number) {
    return paginate<Entity>(
      this.repository,
      {
        page: num,
        limit: size,
      },
      filter,
    );
  }

  delete(id: string) {
    return this.repository.deleteItem(id);
  }

  permanentDelete(id: string) {
    return this.repository.permanentDelete(id);
  }

  update(id: string, item: QueryDeepPartialEntity<Entity>) {
    return this.repository.updateItem(id, item);
  }

  // create item with its relate entity
  // ie: user add a book, so user is the relate entity of book
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
      const createdItem = await this.create(item);
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

  async addWithOneToOneRelation<RelationEntity extends BaseEntity>(
    item: DeepPartial<Entity>,
    relationEntityId: string,
    relateRepository: BaseRepository<RelationEntity>,
    field: keyof RelationEntity,
  ) {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();

    // establish real database connection using our new query runner
    await queryRunner.connect();

    // lets now open a new transaction:
    await queryRunner.startTransaction();

    try {
      // execute some operations on this transaction:
      const relateItem = await relateRepository.findOneItem({
        where: {
          id: relationEntityId,
        },
        relations: [field.toString()],
      });
      const newItem = this.repository.create(item);
      const createdItem = await queryRunner.manager.save(newItem);
      // @ts-ignore
      if (!relateItem[field]) relateItem[field] = {};
      // @ts-ignore
      relateItem[field] = createdItem;
      const savedResult = await queryRunner.manager.save(relateItem);
      await queryRunner.commitTransaction();
      return savedResult;
      // commit transaction now:
    } catch (err) {
      // since we have errors let's rollback changes we made
      await queryRunner.rollbackTransaction();
      throw new BadRequestException('create failure');
    } finally {
      // you need to release query runner which is manually created:
      await queryRunner.release();
    }
  }

  async updateParent<Parent extends BaseEntity>(
    id: string,
    oldParentId: string,
    newParentId: string,
    parentField: keyof Parent,
    parentRepository: BaseRepository<Parent>,
  ) {
    const oldParentItem = await parentRepository.findOne({
      where: {
        id: oldParentId,
      },
      relations: [parentField.toString()],
    });

    const newParentItem = await parentRepository.findOne({
      where: {
        id: newParentId,
      },
      relations: [parentField.toString()],
    });
    //@ts-ignore
    const item = oldParentItem[parentField].filter(
      (entry: Entity) => entry.id === id,
    )[0];

    //@ts-ignore
    if (!newParentItem[parentField]) newParentItem[parentField] = [];

    //@ts-ignore
    newParentItem[parentField].push(item);

    oldParentItem.save();
    return newParentItem.save();
  }
}
