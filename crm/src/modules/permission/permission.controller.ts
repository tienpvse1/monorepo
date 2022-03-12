import { Controller, Delete, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { Permission } from './entities/permission.entity';
import { PermissionService } from './permission.service';

@Controller('permission')
@ApiTags('permission')
@ApiBearerAuth(AUTHORIZATION)
@Crud({
  model: {
    type: Permission,
  },
  dto: {
    create: CreatePermissionDto,
    update: UpdatePermissionDto,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    createOneBase: {
      decorators: [HistoryLog('created an authority')],
    },
    updateOneBase: {
      decorators: [HistoryLog('updated an authority')],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted an authority')],
    },
    exclude: ['deleteOneBase'],
  },
})
export class PermissionController {
  constructor(public service: PermissionService) {}

  @Delete(':id')
  @HistoryLog('Deleted an email template')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
