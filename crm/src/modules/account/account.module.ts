import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountRepository } from './account.repository';

@Module({
  controllers: [AccountController],
  providers: [AccountService],
  imports: [TypeOrmModule.forFeature([AccountRepository])],
  exports: [AccountService],
})
export class AccountModule {}
