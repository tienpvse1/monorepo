import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailTemplateController } from './email-template.controller';
import { EmailTemplateService } from './email-template.service';
import { EmailTemplate } from './entities/email-template.entity';

@Module({
  controllers: [EmailTemplateController],
  providers: [EmailTemplateService],
  imports: [TypeOrmModule.forFeature([EmailTemplate])],
})
export class EmailTemplateModule {}
