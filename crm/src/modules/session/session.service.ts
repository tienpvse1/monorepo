import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { generateExpireDate, isExpired } from 'src/util/check-expire';
import { Session } from './entities/session.entity';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService extends CRUDService<Session, SessionRepository> {
  constructor(
    @InjectRepository(SessionRepository) repository: SessionRepository,
  ) {
    super(repository);
  }

  async getSessionByAccountId(accountId: string) {
    const session = await this.findOneWithoutError({
      where: {
        account: { id: accountId },
      },
    });
    if (!session) return null;
    if (isExpired(session.expiredAt)) {
      await this.permanentDelete(session.id);
      return null;
    }
    return session;
  }

  async updateSession(sessionId: string, ip: string) {
    const updateResult = await this.update(sessionId, {
      ip,
      expiredAt: generateExpireDate(),
    });
    return updateResult;
  }
}
