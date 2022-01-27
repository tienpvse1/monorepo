import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { Session } from './entities/session.entity';
import { SessionRepository } from './session.repository';

@Injectable()
export class SessionService extends CRUDService<Session, SessionRepository> {
  constructor(
    @InjectRepository(SessionRepository) repository: SessionRepository,
  ) {
    super(repository);
  }
}
