import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { Email } from './entities/mailer.entity';

@EntityRepository(Email)
export class EmailRepository extends BaseRepository<Email> {}
