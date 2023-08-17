import { Module, ValidationPipe } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/filter/exception.filter';
import { HistoryInterceptor } from 'src/common/interceptor/history.interceptor';
import { TransformInterceptor } from 'src/common/interceptor/response.interceptor';
import { RoleGuard } from '../auth/guard/role.guard';
import { SessionGuard } from '../auth/guard/session.guard';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: HistoryInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_GUARD,
      useClass: SessionGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },

    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class GlobalModule {}
