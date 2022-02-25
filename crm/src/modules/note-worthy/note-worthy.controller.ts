import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NoteWorthyService } from './note-worthy.service';
import { CreateNoteWorthyDto } from './dto/create-note-worthy.dto';
import { UpdateNoteWorthyDto } from './dto/update-note-worthy.dto';

@Controller('note-worthy')
export class NoteWorthyController {
  constructor(private readonly noteWorthyService: NoteWorthyService) {}

  @Post()
  create(@Body() createNoteWorthyDto: CreateNoteWorthyDto) {
    return this.noteWorthyService.create(createNoteWorthyDto);
  }

  @Get()
  findAll() {
    return this.noteWorthyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.noteWorthyService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteWorthyDto: UpdateNoteWorthyDto) {
    return this.noteWorthyService.update(+id, updateNoteWorthyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.noteWorthyService.remove(+id);
  }
}
