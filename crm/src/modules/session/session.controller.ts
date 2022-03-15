import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UpdateSessionDto } from './dto/update-session.dto';
import { SessionService } from './session.service';

@Controller('session')
@ApiTags('session')
export class SessionController {
  constructor(public service: SessionService) {}

  @Patch('')
  updateSession(@User('id') id: string, @Body() dto: UpdateSessionDto) {
    return this.service.updateSessionNotificationId(id, dto.notificationId);
  }
}
