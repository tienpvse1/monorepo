import { Body, Controller, Post, Res } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response as ExpressResponse } from 'express';
import { Public } from '../../common/decorators/public.decorator';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './interfaces/login-request.dto';

@Controller('auth')
@ApiTags('authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ deprecated: true })
  @Post()
  @Public()
  checkLoginByEmailPassword(
    @Body() loginRequest: LoginRequestDto,
    @Res() response: ExpressResponse
  ) {
    this.authService.loginWithEmailPassword(
      loginRequest.email,
      loginRequest.password,
      response
    );
  }
}
