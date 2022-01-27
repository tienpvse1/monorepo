import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Session } from './entities/session.entity';

@EntityRepository(Session)
export class SessionRepository extends BaseRepository<Session> {}
