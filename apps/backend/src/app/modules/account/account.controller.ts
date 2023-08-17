import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { AUTHORIZATION } from '../../constant/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto, JoinTeamDto } from './dto/create-account.dto';

@Controller('account')
@ApiTags('account')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth(AUTHORIZATION)
export class AccountController {
  constructor(public service: AccountService) {}

  @Post('join-team')
  joinTeam(@Body() dto: JoinTeamDto) {
    return this.service.joinTeam(dto);
  }

  @Public()
  @Post('')
  verifyAndCreate(@Body() body: CreateAccountDto) {
    return this.service.createAccount(body);
  }
}
