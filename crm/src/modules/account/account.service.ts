import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends BaseService<Account> {
  constructor(@InjectRepository(Account) repository: Repository<Account>) {
    super(repository);
  }
}
