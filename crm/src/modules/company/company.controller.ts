import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
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
      'contacts.account': {},
      'contacts.pipelineItems': { alias: 'items' },
      'contacts.pipelineItems.pipelineColumn': {},
      'contacts.pipelineItems.opportunityRevenue': {},
      city: {},
    },
  },
  routes: {
    exclude: ['deleteOneBase', 'createOneBase', 'updateOneBase'],
  },
})
@ApiTags('company')
export class CompanyController {
  constructor(public service: CompanyService) {}

  @Get('with-column')
  async withPipelineColumn() {
    return this.service.getWithColumn();
  }

  @Delete(':id')
  @HistoryLog('deleted an company')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
  @Post()
  create(@Body() dto: CreateCompanyDto, @User('id') userId: string) {
    return this.service.create(dto, userId);
  }
  @Patch(':id')
  @HistoryLog('update a company')
  update(@Param('id') id: string, @Body() dto: UpdateCompanyDto) {
    return this.service.updateCompany(id, dto);
  }
}
