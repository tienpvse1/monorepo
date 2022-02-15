import { Module } from '@nestjs/common';
import { HistoryService } from './history.service';
import { HistoryController } from './history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { History } from './entities/history.entity';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [TypeOrmModule.forFeature([History])],
})
export class HistoryModule {}
