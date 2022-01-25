import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { AccountRepository } from './account.repository';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends CRUDService<Account, AccountRepository> {
  constructor(
    @InjectRepository(AccountRepository) repository: AccountRepository,
  ) {
    super(repository);
  }
}
