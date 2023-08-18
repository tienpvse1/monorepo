import { Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../kysely';

@Injectable()
export class PermissionService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  softDelete(id: string) {
    return this.kysely
      .updateTable('permission')
      .set({ deletedAt: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirstOrThrow();
  }
}
