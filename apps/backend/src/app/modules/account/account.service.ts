import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InsertObject } from 'kysely';
import { InjectKysely, Kysely } from '../../kysely';
import { DB } from '../../kysely/models';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectKysely private readonly kysely: Kysely,
    private config: ConfigService
  ) {}

  async create(account: InsertObject<DB, 'account'>) {
    return this.kysely
      .insertInto('account')
      .values(account)
      .returningAll()
      .executeTakeFirst();
  }

  async findOneOrCreate(account: InsertObject<DB, 'account'>) {
    return this.kysely
      .insertInto('account')
      .values(account)
      .onConflict((oc) => oc.column('email').doNothing())
      .returningAll()
      .executeTakeFirst();
  }

  async createAccount(dto: CreateAccountDto) {
    const [result, error] = await resolve(
      this.kysely
        .insertInto('account')
        .values(dto)
        .returningAll()
        .executeTakeFirst()
    );
    if (error) throw new BadRequestException('cannot create account');
    return result;
  }

  async findOneByEmail(email: string) {
    return this.kysely
      .selectFrom('account')
      .where('account.email', '=', email)
      .select([
        'email',
        'password',
        'id',
        'firstName',
        'lastName',
        'image',
        'active',
        'role',
      ])
      .executeTakeFirst();
  }

  joinTeam(userId: string, teamId: string) {
    return this.kysely
      .updateTable('account')
      .set({ teamId })
      .where('id', '=', userId)
      .returningAll()
      .executeTakeFirst();
  }
}
