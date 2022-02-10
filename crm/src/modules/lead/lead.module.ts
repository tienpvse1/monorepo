import { Module } from '@nestjs/common';
import { LeadService } from './lead.service';
import { LeadController } from './lead.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadRepository } from './lead.repository';

@Module({
  controllers: [LeadController],
  providers: [LeadService],
  imports: [TypeOrmModule.forFeature([LeadRepository])],
})
export class LeadModule {}
