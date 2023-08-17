import { Module } from '@nestjs/common';
import { InboxService } from './inbox.service';
import { InboxController } from './inbox.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inbox } from './entities/inbox.entity';
import { InboxRepository } from './inbox.repository';

@Module({
  controllers: [InboxController],
  providers: [InboxService],
  imports: [TypeOrmModule.forFeature([Inbox, InboxRepository])],
})
export class InboxModule {}
