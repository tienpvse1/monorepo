import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductAccount } from './entities/product-account.entity';
import { ProductAccountService } from './product-account.service';

@Module({
  providers: [ProductAccountService],
  imports: [TypeOrmModule.forFeature([ProductAccount])],
  exports: [ProductAccountService],
})
export class ProductAccountModule {}
