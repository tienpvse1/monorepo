import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AutomationEmailTemplateService } from './automation-email-template.service';
import { CreateAutomationEmailTemplateDto } from './dto/create-automation-email-template.dto';
import { UpdateAutomationEmailTemplateDto } from './dto/update-automation-email-template.dto';

@Controller('automation-email-template')
export class AutomationEmailTemplateController {
  constructor(private readonly automationEmailTemplateService: AutomationEmailTemplateService) {}

  @Post()
  create(@Body() createAutomationEmailTemplateDto: CreateAutomationEmailTemplateDto) {
    return this.automationEmailTemplateService.create(createAutomationEmailTemplateDto);
  }

  @Get()
  findAll() {
    return this.automationEmailTemplateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.automationEmailTemplateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAutomationEmailTemplateDto: UpdateAutomationEmailTemplateDto) {
    return this.automationEmailTemplateService.update(+id, updateAutomationEmailTemplateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.automationEmailTemplateService.remove(+id);
  }
}
