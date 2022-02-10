import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionRepository } from './session.repository';

@Module({
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
  imports: [TypeOrmModule.forFeature([SessionRepository])],
})
export class SessionModule {}
