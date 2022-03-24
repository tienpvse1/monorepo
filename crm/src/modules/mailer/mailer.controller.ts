import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { EmailService } from './mailer.service';

@Controller('mailer')
@ApiTags('email')
@ApiBearerAuth(AUTHORIZATION)
export class MailerController {
  constructor(private readonly mailerService: EmailService) {}

  @Post('send')
  @HistoryLog('send an email')
  async sendEmail(
    @Body() email: CreateMailerDto,
    @Ip() ip: string,
    @User('id') senderId: string,
  ) {
    return this.mailerService.sendEmail(email, ip, senderId);
  }
}
