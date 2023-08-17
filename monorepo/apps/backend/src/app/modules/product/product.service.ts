import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../kysely';
import { ParsedAssignAccountDto } from './dto/assign-account.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async assignAccounts(dtos: ParsedAssignAccountDto[]) {
    const createFn = this.kysely
      .insertInto('productAccount')
      .values(dtos)
      .returningAll()
      .execute();
    const [createdProduct, error] = await resolve(createFn);
    if (!createdProduct || error)
      throw new BadRequestException(
        'cannot perform assign production operation'
      );
    return createdProduct;
  }

  async create(dto: CreateProductDto) {
    const createFn = this.kysely
      .insertInto('product')
      .values(dto)
      .returningAll()
      .executeTakeFirst();
    const [createdProduct, error] = await resolve(createFn);
    if (!createdProduct || error)
      throw new BadRequestException('cannot create product');
    return createdProduct;
  }

  async update(id: string, dto: UpdateProductDto) {
    const updateFn = this.kysely
      .updateTable('product')
      .set(dto)
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    const [updatedResult, error] = await resolve(updateFn);
    if (!updatedResult || error)
      throw new BadRequestException('cannot update product');
    return updatedResult;
  }

  async softDelete(id: string) {
    const deleteFn = this.kysely
      .updateTable('product')
      .set({ deletedAt: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
    const [deletedProduct, error] = await resolve(deleteFn);
    if (!deletedProduct || error)
      throw new BadRequestException('cannot delete product');
    return deletedProduct;
  }
}
