import { Body, Controller, Get, Ip, Post, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreateMailerDto } from './dto/create-mailer.dto';
import { UpdateMailerDto } from './dto/update-mailer.dto';
import { Email } from './entities/mailer.entity';
import { EmailService } from './mailer.service';

@Controller('mailer')
@ApiTags('email')
@ApiBearerAuth(AUTHORIZATION)
@Crud({
  model: {
    type: Email,
  },
  dto: {
    create: CreateMailerDto,
    update: UpdateMailerDto,
  },
  routes: {
    exclude: ['createOneBase', 'createManyBase'],
  },
  query: {
    join: {
      account: {},
    },
  },
  params: {
    id: {
      type: 'string',
      primary: true,
      field: 'id',
    },
  },
})
export class MailerController {
  constructor(private readonly service: EmailService) {}

  @Post('send')
  @HistoryLog('send an email')
  async sendEmail(
    @Body() email: CreateMailerDto,
    @Ip() ip: string,
    @User('id') senderId: string,
  ) {
    return this.service.sendEmail(email, ip, senderId);
  }

  @Get('count')
  async countEmail(@Query('id') id: string) {
    if (id) {
      return this.service.repository.count({ where: { account: { id } } });
    }
    return this.service.repository.count();
  }
}
