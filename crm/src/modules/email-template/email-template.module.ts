import { Module } from '@nestjs/common';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplateController } from './email-template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateRepository } from './email-template.repository';

@Module({
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService],
  imports: [TypeOrmModule.forFeature([EmailTemplateRepository])],
})
export class EmailTemplateModule {}
