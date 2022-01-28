import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { Lead } from './entities/lead.entity';
import { LeadService } from './lead.service';

@Controller('lead')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('lead')
@Crud({
  model: {
    type: Lead,
  },
  dto: {
    create: CreateLeadDto,
    update: UpdateLeadDto,
  },
})
export class LeadController {
  constructor(public service: LeadService) {}
}
