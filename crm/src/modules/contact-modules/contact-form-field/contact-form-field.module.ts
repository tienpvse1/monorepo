import { Module } from '@nestjs/common';
import { ContactFormFieldService } from './contact-form-field.service';
import { ContactFormFieldController } from './contact-form-field.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactFormFieldRepository } from './contact-form-field.repository';

@Module({
  controllers: [ContactFormFieldController],
  providers: [ContactFormFieldService],
  imports: [TypeOrmModule.forFeature([ContactFormFieldRepository])],
})
export class ContactFormFieldModule {}
