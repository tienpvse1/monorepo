import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../../constant';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) return true;
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;
    const isAllow = requireRoles.some((role) => user.role === role);
    if (!isAllow) throw new ForbiddenException();
    return isAllow;
  }
}
