import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('note-worthy')
@ApiTags('Note worthy')
export class NoteWorthyController {}
