import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getRepository } from 'typeorm';
import { Permission } from '../permission/entities/permission.entity';
import { AddPermissionDto, CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import { RoleService } from './role.service';

@Controller('role')
@ApiTags('Role')
@ApiBearerAuth(AUTHORIZATION)
@Crud({
  model: {
    type: Role,
  },
  dto: {
    create: CreateRoleDto,
    update: UpdateRoleDto,
  },
  params: {
    id: {
      type: 'uuid',
      field: 'id',
      primary: true,
    },
  },
  routes: {
    exclude: ['createOneBase', 'deleteOneBase'],
  },
})
export class RoleController {
  constructor(public service: RoleService) {}

  @Post('')
  @HistoryLog('add a role to the system')
  async addRole(@Body() { name, permissionIds }: AddPermissionDto) {
    const permissionRepository = getRepository(Permission);
    return this.service.addManyWithRelation<Permission>(
      { name },
      permissionIds,
      permissionRepository,
      'permissions',
    );
  }
  @Get('fetch-permission/:id')
  async getPermissions(@Param('id') id: string) {
    return this.service.findOne(id, {
      relations: ['permissions'],
    });
  }

  @Delete(':id')
  @HistoryLog('Deleted an email template')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
