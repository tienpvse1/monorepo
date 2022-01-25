import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactFormRepository } from './contact-form.repository';

@Module({
  controllers: [ContactFormController],
  providers: [ContactFormService],
  imports: [TypeOrmModule.forFeature([ContactFormRepository])],
})
export class ContactFormModule {}
