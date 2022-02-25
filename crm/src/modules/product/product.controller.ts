import { Body, Controller, Param, Patch, UsePipes } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Crud, Override } from '@nestjsx/crud';
import {
  AssignAccountDto,
  ParsedAssignAccountDto,
} from './dto/assign-account.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { AssignAccountPipe } from './pipe/assign-validator.pipe';
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
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  routes: {
    createOneBase: {
      decorators: [UsePipes(DateValidatorPipe)],
    },

    exclude: ['createManyBase', 'updateOneBase'],
  },
})
export class ProductController {
  constructor(public service: ProductService) {}

  @Override('createOneBase')
  @UsePipes(DateValidatorPipe)
  createOne(@Body() body: CreateProductDto) {
    return this.service.createItem(body);
  }

  @Patch('/assign')
  @ApiOperation({
    summary: 'assign product to account so he can manage this',
    description:
      'when account is assigned to this, he/she can view, modify its pipeline',
  })
  @UsePipes(AssignAccountPipe)
  @ApiBody({ type: AssignAccountDto })
  async assignAccount(@Body() body: ParsedAssignAccountDto[]) {
    return this.service.assignAccounts(body);
  }
  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    const validatedData = await this.service.validateUpdateData(id, dto);
    return this.service.update(id, validatedData);
  }
}
