import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';

@Injectable()
export class PermissionService extends BaseService<Permission> {
  constructor(
    @InjectRepository(Permission) repository: Repository<Permission>,
  ) {
    super(repository);
  }
}
