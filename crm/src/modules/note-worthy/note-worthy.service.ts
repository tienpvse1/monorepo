import { Injectable } from '@nestjs/common';
import { CreateNoteWorthyDto } from './dto/create-note-worthy.dto';
import { UpdateNoteWorthyDto } from './dto/update-note-worthy.dto';

@Injectable()
export class NoteWorthyService {
  create(createNoteWorthyDto: CreateNoteWorthyDto) {
    return 'This action adds a new noteWorthy';
  }

  findAll() {
    return `This action returns all noteWorthy`;
  }

  findOne(id: number) {
    return `This action returns a #${id} noteWorthy`;
  }

  update(id: number, updateNoteWorthyDto: UpdateNoteWorthyDto) {
    return `This action updates a #${id} noteWorthy`;
  }

  remove(id: number) {
    return `This action removes a #${id} noteWorthy`;
  }
}
