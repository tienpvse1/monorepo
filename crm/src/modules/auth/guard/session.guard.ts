import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { IS_PUBLIC_KEY } from 'src/constance';
import { AccountRepository } from 'src/modules/account/account.repository';
import { History } from 'src/modules/history/entities/history.entity';
import { SessionRepository } from 'src/modules/session/session.repository';
import { getHistory } from 'src/util/history';
import { getIp } from 'src/util/ip';
import { getCustomRepository, getRepository } from 'typeorm';

@Injectable()
export class SessionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    const request: Request = context.switchToHttp().getRequest();
    const sessionId = request.cookies['sessionId'];
    if (isPublic) {
      return true;
    }
    const repository = getCustomRepository(SessionRepository);
    const accountRepository = getCustomRepository(AccountRepository);
    const session = await repository.findOne({
      where: {
        id: sessionId,
        ip: getIp(request.ip),
      },
      relations: ['account'],
    });
    if (!session) return false;
    if (new Date(session.expiredAt) < new Date()) {
      repository.delete(sessionId);
      return false;
    }

    const account = await accountRepository.findOneItem({
      where: { id: session.account.id },
      relations: ['role'],
    });
    request.user = {
      id: session.account.id,
      role: account.role,
    };

    // save action to history
    const historyRepository = getRepository(History);
    if (request.method.toUpperCase() !== 'GET') {
      historyRepository.save({
        id: nanoid(10),
        account: account,
        ip: getIp(request.ip),
        url: request.url,
        name: getHistory(request.url, request.method.toUpperCase()),
        method: request.method,
      });
    }

    return true;
  }
}
