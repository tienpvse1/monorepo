import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Response } from 'express';
import { AccountController } from 'src/modules/account/account.controller';
import { PASSTHROUGH } from '../decorators/passthrough.decorator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly reflector: Reflector) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const isPassthrough = this.reflector.getAllAndOverride<boolean>(
      PASSTHROUGH,
      [AccountController],
    );

    let isBadRequest = false;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    let destination = '';
    if (status === HttpStatus.NOT_FOUND) {
      destination = 'not-found';
    } else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      destination = 'internal-server-error';
    } else if (
      status === HttpStatus.UNAUTHORIZED ||
      status === HttpStatus.FORBIDDEN
    ) {
      destination = 'unauthorize';
    } else if (status === HttpStatus.BAD_REQUEST) {
      isBadRequest = true;
    } else {
      destination = 'something-occur';
    }
    if (isPassthrough && !isBadRequest)
      return response.redirect(`/${destination}.html`);
    return response.json({
      statusCode: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: request.url,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      info: exception.getResponse().message,
    });
  }
}
