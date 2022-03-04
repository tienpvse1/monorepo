import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { InternalServerEvent } from 'src/constance/event';
import { AccountRepository } from 'src/modules/account/account.repository';
import { History } from 'src/modules/history/entities/history.entity';
import { SessionRepository } from 'src/modules/session/session.repository';
import { getIp } from 'src/util/ip';
import { getCustomRepository, getRepository } from 'typeorm';
import { MESSAGE } from '../decorators/message.decorator';

@Injectable()
export class HistoryInterceptor implements NestInterceptor {
  constructor(
    private eventEmitter: EventEmitter2,
    private reflector: Reflector,
  ) {}

  async saveHistory(request: Request, message = '') {
    const accountRepository = getCustomRepository(AccountRepository);
    const repository = getCustomRepository(SessionRepository);
    const historyRepository = getRepository(History);
    const sessionId = request.cookies['sessionId'];
    const session = await repository.findOne({
      where: {
        id: sessionId,
        ip: getIp(request.ip),
      },
      relations: ['account', 'account.team'],
    });
    if (!session) return;
    const account = await accountRepository.findOneItem({
      where: { id: session.account.id },
      relations: ['role'],
    });
    this.eventEmitter.emit(InternalServerEvent.HISTORY_ADDED, {
      account,
      message,
    });
    historyRepository.save({
      id: nanoid(10),
      account: account,
      ip: getIp(request.ip),
      url: request.url,
      name: message,
      method: request.method,
      payload: request.body,
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request: Request = context.switchToHttp().getRequest();
    if (request.method !== 'GET') this.saveHistory(request);
    const message = this.reflector.getAll(MESSAGE, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.saveHistory(request, message[0]);
    return next.handle();
  }
}
