import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/constance';
import { AutomationEmailTemplateService } from './automation-email-template.service';
import { CreateAutomationEmailTemplateDto } from './dto/create-automation-email-template.dto';
import { UpdateAutomationEmailTemplateDto } from './dto/update-automation-email-template.dto';

@Controller('automation-email-template')
export class AutomationEmailTemplateController {
  constructor(
    readonly automationEmailTemplateService: AutomationEmailTemplateService,
  ) {}

  @Post()
  @HasRoles(Roles.ADMIN)
  createEmailTemplate(
    @Body() dto: CreateAutomationEmailTemplateDto,
    @User('id') id: string,
  ) {
    dto.account_id = id;
    return this.automationEmailTemplateService.createEmailTemplate(dto);
  }
  @Patch(':id')
  @HasRoles(Roles.ADMIN)
  updateEmailTemplate(
    @Body() dto: UpdateAutomationEmailTemplateDto,
    @Param('id') templateId: string,
    @User('id') id: string,
  ) {
    dto.account_id = id;
    return this.automationEmailTemplateService.updateEmailTemplate(
      dto,
      templateId,
    );
  }
}
