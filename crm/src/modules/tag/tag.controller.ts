import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('tag')
@ApiTags('Tag')
export class TagController {}
