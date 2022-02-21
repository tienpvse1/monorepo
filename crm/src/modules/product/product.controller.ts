import { Controller, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { DateValidatorPipe } from './pipe/date-validator.pipe';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
@Crud({
  model: {
    type: Product,
  },
  dto: {
    create: CreateProductDto,
    replace: UpdateProductDto,
    update: UpdateProductDto,
  },
  routes: {
    createOneBase: {
      decorators: [UsePipes(DateValidatorPipe)],
    },
    exclude: ['createManyBase'],
  },
})
export class ProductController {
  constructor(public service: ProductService) {}
}
