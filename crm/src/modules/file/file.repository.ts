import { BaseRepository } from 'src/base/base.repository';
import { EntityRepository } from 'typeorm';
import { File } from './entities/file.entity';

@EntityRepository(File)
export class FileRepository extends BaseRepository<File> {}
