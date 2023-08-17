import { PartialType } from '@nestjs/swagger';
import { CreateNoteWorthyDto } from './create-note-worthy.dto';

export class UpdateNoteWorthyDto extends PartialType(CreateNoteWorthyDto) {}
