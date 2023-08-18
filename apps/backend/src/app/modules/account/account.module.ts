import { Module } from '@nestjs/common';
import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';

@Module({
  providers: [AccountService, AccountResolver],
  exports: [AccountService],
})
export class AccountModule {}
