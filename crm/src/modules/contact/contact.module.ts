import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactRepository } from './contact.repository';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [TypeOrmModule.forFeature([ContactRepository])],
})
export class ContactModule {}
