import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Request } from 'express';
import { nanoid } from 'nanoid';
import { Observable } from 'rxjs';
import { AccountRepository } from 'src/modules/account/account.repository';
import { History } from 'src/modules/history/entities/history.entity';
import { SessionRepository } from 'src/modules/session/session.repository';
import { getHistory } from 'src/util/history';
import { getIp } from 'src/util/ip';
import { getCustomRepository, getRepository } from 'typeorm';

@Injectable()
export class HistoryInterceptor implements NestInterceptor {
  async saveHistory(request: Request) {
    const accountRepository = getCustomRepository(AccountRepository);
    const repository = getCustomRepository(SessionRepository);
    const historyRepository = getRepository(History);
    const sessionId = request.cookies['sessionId'];
    const session = await repository.findOne({
      where: {
        id: sessionId,
        ip: getIp(request.ip),
      },
      relations: ['account'],
    });
    if (!session) return;
    const account = await accountRepository.findOneItem({
      where: { id: session.account.id },
      relations: ['role'],
    });
    historyRepository.save({
      id: nanoid(10),
      account: account,
      ip: getIp(request.ip),
      url: request.url,
      name: getHistory(request.url, request.method.toUpperCase()),
      method: request.method,
      payload: request.body,
    });
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    this.saveHistory(request);
    return next.handle();
  }
}
