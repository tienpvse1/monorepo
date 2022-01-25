import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Roles, ROLES_KEY } from 'src/constance';
import { ITokenPayload } from '../interfaces/token.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requireRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user: ITokenPayload = request.user;
    const isAllow = requireRoles.some((role) => user.role === role);
    if (!isAllow) throw new ForbiddenException();
    return isAllow;
  }
}
