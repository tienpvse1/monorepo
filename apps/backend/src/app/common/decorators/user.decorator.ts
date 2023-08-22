import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
export const User = createParamDecorator(
  (data: keyof Express.User, ctx: ExecutionContext) => {
    const request = GqlExecutionContext.create(ctx).getContext().req as Request;
    const user = request.user;
    return data ? user?.[data] : user;
  }
);
