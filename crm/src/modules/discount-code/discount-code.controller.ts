import { Body, Controller, Get, Ip, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { User } from 'src/common/decorators/user.decorator';
import { getIp } from 'src/util/ip';
import { DiscountCodeService } from './discount-code.service';
import { CreateDiscountCodeDto } from './dto/create-discount-code.dto';
import { GenerateTemplateDto } from './dto/generate-template.dto';
import {
  AssignDiscountCode,
  UpdateDiscountCodeDto,
} from './dto/update-discount-code.dto';
import { DiscountCode } from './entities/discount-code.entity';

@Controller('discount-code')
@ApiTags('discount-code')
@Crud({
  model: {
    type: DiscountCode,
  },
  dto: {
    create: CreateDiscountCodeDto,
    update: UpdateDiscountCodeDto,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    join: {
      pipelineItem: {},
      account: {},
    },
  },
})
export class DiscountCodeController {
  constructor(readonly service: DiscountCodeService) {}

  @Post()
  createDiscountCode(
    @Body() dto: CreateDiscountCodeDto,
    @Ip() ip: string,
    @User('id') userId: string,
  ) {
    return this.service.createDiscountCode(dto, getIp(ip), userId);
  }

  @Get('apply/:id')
  apply(@Param('id') id: string) {
    return this.service.applyDiscountCode(id);
  }

  @Patch('assign/:id')
  assignDiscountCode(@Param('id') id: string, dto: AssignDiscountCode) {
    this.service.assignDiscountCode(id, dto.pipelineItemId);
  }

  @Post('template')
  getTemplate(@Body() dto: GenerateTemplateDto) {
    return this.service.getDiscountCodeTemplate(dto);
  }
}
