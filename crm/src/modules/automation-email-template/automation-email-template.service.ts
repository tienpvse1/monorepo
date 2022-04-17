import { Injectable } from '@nestjs/common';
import { CreateAutomationEmailTemplateDto } from './dto/create-automation-email-template.dto';
import { UpdateAutomationEmailTemplateDto } from './dto/update-automation-email-template.dto';

@Injectable()
export class AutomationEmailTemplateService {
  create(createAutomationEmailTemplateDto: CreateAutomationEmailTemplateDto) {
    return 'This action adds a new automationEmailTemplate';
  }

  findAll() {
    return `This action returns all automationEmailTemplate`;
  }

  findOne(id: number) {
    return `This action returns a #${id} automationEmailTemplate`;
  }

  update(id: number, updateAutomationEmailTemplateDto: UpdateAutomationEmailTemplateDto) {
    return `This action updates a #${id} automationEmailTemplate`;
  }

  remove(id: number) {
    return `This action removes a #${id} automationEmailTemplate`;
  }
}
