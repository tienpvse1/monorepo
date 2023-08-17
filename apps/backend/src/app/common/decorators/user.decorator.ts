import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ITokenPayload } from 'src/modules/auth/interfaces/token.interface';
export const User = createParamDecorator(
  (data: keyof ITokenPayload, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user: ITokenPayload = request.user;

    return data ? user?.[data] : user;
  },
);
