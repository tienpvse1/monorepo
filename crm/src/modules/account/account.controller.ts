import {
  ClassSerializerInterceptor,
  Controller,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { IsPassthrough } from 'src/common/decorators/passthrough.decorator';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { Roles } from 'src/constance';
import { AUTHORIZATION } from 'src/constance/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';
import { ExcludePasswordPipe } from './exclude-password.pipe';

@Controller('account')
@ApiTags('account')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth(AUTHORIZATION)
@Crud({
  model: {
    type: Account,
  },
  dto: {
    create: CreateAccountDto,
    update: UpdateAccountDto,
  },
  routes: {
    // createOneBase: {
    //   decorators: [HasRoles(Roles.ADMIN)],
    // },
    createManyBase: {
      decorators: [HasRoles(Roles.ADMIN)],
    },
    updateOneBase: {
      decorators: [UsePipes(ExcludePasswordPipe)],
    },
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
})
@IsPassthrough()
export class AccountController {
  constructor(public service: AccountService) {}
}
