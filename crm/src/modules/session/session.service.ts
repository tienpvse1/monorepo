import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { generateExpireDate, isExpired } from 'src/util/check-expire';
import { getRepository } from 'typeorm';
import { Socket } from '../socket/entities/socket.entity';
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

  async updateSession(sessionId: string, ip: string, socketId?: string) {
    const socketRepository = getRepository(Socket);
    const socket = socketRepository.create({ id: socketId });

    const session = await this.findOne({
      where: { id: sessionId },
      relations: ['sockets'],
    });
    Object.assign(session, { ip, expiredAt: generateExpireDate() });
    if (socketId) {
      const createdSocket = await socket.save();
      if (session.sockets == undefined) {
        session.sockets = [createdSocket];
        return session.save();
      }
      for (const { id } of session.sockets) {
        if (id === sessionId) return session.save();
      }
      session.sockets.push(socket);
      return session.save();
    }

    return session.save();
  }
}
