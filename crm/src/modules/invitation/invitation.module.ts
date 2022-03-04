import { Module } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invitation } from './entities/invitation.entity';

@Module({
  controllers: [InvitationController],
  providers: [InvitationService],
  imports: [TypeOrmModule.forFeature([Invitation])],
})
export class InvitationModule {}
