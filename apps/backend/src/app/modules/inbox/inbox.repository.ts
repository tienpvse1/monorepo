import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Inbox } from './entities/inbox.entity';

@EntityRepository(Inbox)
export class InboxRepository extends BaseRepository<Inbox> {}
