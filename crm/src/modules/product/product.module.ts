import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductAccountModule } from '../product-account/product-account.module';
import { AccountModule } from '../account/account.module';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    TypeOrmModule.forFeature([Product]),
    ProductAccountModule,
    AccountModule,
  ],
})
export class ProductModule {}
