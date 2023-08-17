import { Module } from '@nestjs/common';
import { NoteWorthyService } from './note-worthy.service';
import { NoteWorthyController } from './note-worthy.controller';

@Module({
  controllers: [NoteWorthyController],
  providers: [NoteWorthyService]
})
export class NoteWorthyModule {}
