import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    // if (status === HttpStatus.FORBIDDEN || HttpStatus.UNAUTHORIZED) {
    //   response.clearCookie('public_user_info');
    //   response.clearCookie('sessionId');
    // }

    return response.status(status).json({
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
