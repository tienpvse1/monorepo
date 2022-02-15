import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactService } from './contact.service';
import { Contact } from './entities/contact.entity';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [TypeOrmModule.forFeature([Contact])],
})
export class ContactModule {}
