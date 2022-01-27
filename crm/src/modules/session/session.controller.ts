import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('session')
@ApiTags('session')
export class SessionController {}
