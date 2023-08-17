import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  AssignAccountDto,
  ParsedAssignAccountDto,
} from './dto/assign-account.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './product.service';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private service: ProductService) {}

  @Post()
  createOne(@Body() body: CreateProductDto) {
    return this.service.create(body);
  }

  @Patch('/assign')
  @ApiOperation({
    summary: 'assign product to account so they can manage this',
    description:
      'when accounts is assigned to this, they can view, modify its pipeline',
  })
  @ApiBody({ type: AssignAccountDto })
  async assignAccount(@Body() body: ParsedAssignAccountDto[]) {
    return this.service.assignAccounts(body);
  }

  @Patch(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.service.update(id, UpdateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
