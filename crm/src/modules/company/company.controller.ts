import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Controller('company')
@Crud({
  model: {
    type: Company,
  },
  dto: {
    create: CreateCompanyDto,
    update: UpdateCompanyDto,
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
  query: {
    join: {
      contacts: {},
    },
  },
  routes: {
    exclude: ['deleteOneBase', 'createOneBase'],
  },
})
@ApiTags('company')
export class CompanyController {
  constructor(public service: CompanyService) {}

  @Delete(':id')
  @HistoryLog('deleted an company')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
  @Post()
  create(@Body() dto: CreateCompanyDto) {
    return this.service.create(dto);
  }
}
