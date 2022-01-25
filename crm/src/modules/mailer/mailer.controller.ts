import { MailerService as RootService } from '@nestjs-modules/mailer';
import { Body, Controller, Ip, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { EmailService } from './mailer.service';

@Controller('mailer')
@ApiTags('email')
@ApiBearerAuth(AUTHORIZATION)
export class MailerController {
  constructor(
    private readonly mailerService: EmailService,
    private readonly rootService: RootService,
  ) {}

  @Post('send')
  async sendEmail(
    @Body() email: CreateMailerDto,
    @Ip() ip: string,
    @User('id') senderId: string,
  ) {
    this.rootService.sendMail({
      to: email.to,
      subject: email.subject,
      html: email.value,
    });

    return this.mailerService.addEmailToDB(email, ip, senderId);
  }
}
