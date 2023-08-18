import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './interfaces/login-request.dto';
import { RegisterDto } from './interfaces/register.dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Post()
  @Public()
  checkLoginByEmailPassword(
    @Body() loginRequest: LoginRequestDto,
    @Req() request: Request
  ) {
    return this.service.loginWithEmailPassword(
      loginRequest.email,
      loginRequest.password,
      request
    );
  }

  @Post('register')
  @Public()
  register(@Body() dto: RegisterDto) {
    return this.service.register(dto);
  }
}
