import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from '../../constant/swagger';
import { PermissionService } from './permission.service';

@Controller('permission')
@ApiTags('permission')
@ApiBearerAuth(AUTHORIZATION)
export class PermissionController {
  constructor(public service: PermissionService) {}

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
