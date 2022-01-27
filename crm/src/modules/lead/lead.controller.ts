import { Controller, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { BaseController } from 'src/base/base.controller';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { LeadRepository } from './lead.repository';
import { LeadService } from './lead.service';

@Controller('lead')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('lead')
export class LeadController extends BaseController<
  Lead,
  CreateLeadDto,
  UpdateLeadDto,
  LeadRepository,
  LeadService
> {
  constructor(service: LeadService) {
    super(service);
  }

  @Post()
  override create(createDto: CreateLeadDto): Promise<Lead> {
    return this.service.create(createDto);
  }

  @Patch(':id')
  override update(id: string, updateDto: UpdateLeadDto): Promise<Lead> {
    return this.update(id, updateDto);
  }
}
