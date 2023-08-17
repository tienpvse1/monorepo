import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';
export interface ResponseObject<T> {
  message: string;
  statusCode: HttpStatus;
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, ResponseObject<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<ResponseObject<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => {
        const response: Response = context.switchToHttp().getResponse();
        return {
          responseTime: `${Date.now() - now} ms`,
          message: response.statusMessage || 'success',
          statusCode: response.statusCode,
          data,
        };
      }),
    );
  }
}
