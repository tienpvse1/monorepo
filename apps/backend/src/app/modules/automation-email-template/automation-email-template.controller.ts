import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/constance';
import { AutomationEmailTemplateService } from './automation-email-template.service';
import { CreateAutomationEmailTemplateDto } from './dto/create-automation-email-template.dto';
import { UpdateAutomationEmailTemplateDto } from './dto/update-automation-email-template.dto';
import { AutomationEmailTemplate } from './entities/automation-email-template.entity';

@Controller('automation-email-template')
@ApiTags('automation-email-template')
@Crud({
  model: { type: AutomationEmailTemplate },
  dto: {
    create: CreateAutomationEmailTemplateDto,
    update: UpdateAutomationEmailTemplateDto,
  },
  query: {
    join: {
      account: {},
    },
  },
  routes: {
    exclude: ['createOneBase', 'updateOneBase', 'createManyBase'],
  },
})
export class AutomationEmailTemplateController {
  constructor(readonly service: AutomationEmailTemplateService) {}

  @Post()
  @HasRoles(Roles.ADMIN)
  createEmailTemplate(
    @Body() dto: CreateAutomationEmailTemplateDto,
    @User('id') id: string,
  ) {
    dto.account_id = id;
    return this.service.createEmailTemplate(dto);
  }
  @Patch(':id')
  @HasRoles(Roles.ADMIN)
  updateEmailTemplate(
    @Body() dto: UpdateAutomationEmailTemplateDto,
    @Param('id') templateId: string,
    @User('id') id: string,
  ) {
    dto.account_id = id;
    return this.service.updateEmailTemplate(dto, templateId);
  }
}
