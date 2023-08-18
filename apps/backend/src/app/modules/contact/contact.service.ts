import { Injectable } from '@nestjs/common';
import { sql } from 'kysely';
import { InjectKysely, Kysely } from '../../kysely';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async createOneContact(dto: CreateContactDto, accountId: string) {
    return this.kysely
      .insertInto('contact')
      .values({
        ...dto,
        image: sql<string>`(${JSON.stringify(dto.image)})::jsonb`,
        createdById: accountId,
      })
      .returningAll()
      .execute();
  }
}
