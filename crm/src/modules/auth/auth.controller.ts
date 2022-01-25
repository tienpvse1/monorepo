import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response as ExpressResponse } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { GoogleAuthGuard } from './guard/google.guard';
import { LoginRequestDto } from './interfaces/login-request.dto';
import { IGoogleUser } from './interfaces/user.google';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @Public()
  @UseGuards(GoogleAuthGuard)
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  login() {}

  @Post()
  @Public()
  checkLoginByEmailPassword(
    @Body() loginRequest: LoginRequestDto,
    @Res() response: ExpressResponse,
  ) {
    this.authService.loginByEmailPassword(loginRequest, response);
  }

  @Get('google/redirect')
  @ApiBearerAuth('')
  @Public()
  @UseGuards(GoogleAuthGuard)
  redirect(@Req() request: Request, @Response() response: ExpressResponse) {
    return this.authService.findOrCreateAccount(
      request.user as IGoogleUser,
      response,
    );
  }
}
