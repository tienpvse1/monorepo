import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CRUDService } from 'src/base/base.service';
import { File } from './entities/file.entity';
import { FileRepository } from './file.repository';

@Injectable()
export class FileService extends CRUDService<File, FileRepository> {
  constructor(@InjectRepository(FileRepository) repository: FileRepository) {
    super(repository);
  }
}
