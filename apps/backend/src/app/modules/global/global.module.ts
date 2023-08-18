import { Module, ValidationPipe } from '@nestjs/common';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { RoleGuard } from '../auth/guard/role.guard';
import { JwtAuthGuard } from '../auth/guard/jwt.guard';

@Module({
  providers: [
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RoleGuard },
    { provide: APP_PIPE, useClass: ValidationPipe },
  ],
})
export class GlobalModule {}
