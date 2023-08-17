import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../../../constant';
import { RoleType } from '../../role/entities/role.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<RoleType[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requireRoles) return true;
    // const request = context.switchToHttp().getRequest();
    // const user: ITokenPayload = request.user;
    // const isAllow = requireRoles.some((role) => user.role.name === role);
    // if (!isAllow) throw new ForbiddenException();
    // return isAllow;
    return true;
  }
}
