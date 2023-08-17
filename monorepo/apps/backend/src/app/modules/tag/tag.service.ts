import { resolve } from '@monorepo/common';
import {
  BadGatewayException,
  BadRequestException,
  Injectable,
} from '@nestjs/common';
import { sql } from 'kysely';
import { InjectKysely, Kysely } from '../../kysely';
import { CreateTagDto } from './dto/create-tag.dto';

@Injectable()
export class TagService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async findAllTags() {
    return this.kysely.selectFrom('tag').selectAll().execute();
  }

  async softDelete(id: string) {
    const deleteFn = this.kysely
      .updateTable('tag')
      .set({ deletedAt: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    const [deletedTag, error] = await resolve(deleteFn);
    if (!deletedTag || error)
      throw new BadGatewayException('cannot delete tag');
    return deletedTag;
  }

  async createTag(dto: CreateTagDto) {
    const createFn = this.kysely
      .insertInto('tag')
      .values({
        label: dto.label,
        styles: sql<string>`(${JSON.stringify(dto.styles)})::jsonb`,
      })
      .returningAll()
      .executeTakeFirst();
    const [createdTag, error] = await resolve(createFn);
    if (!createdTag || error)
      throw new BadRequestException('cannot create tag');
    return createdTag;
  }
}
