import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { History } from './entities/history.entity';

@EntityRepository(History)
export class HistoryRepository extends BaseRepository<History> {}
