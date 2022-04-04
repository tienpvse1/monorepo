import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { IsPassthrough } from 'src/common/decorators/passthrough.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { Roles } from 'src/constance';
import { AUTHORIZATION } from 'src/constance/swagger';
import { AccountService } from './account.service';
import { CreateAccountDto, JoinTeamDto } from './dto/create-account.dto';
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
    createOneBase: {
      decorators: [HistoryLog('created an account')],
    },
    createManyBase: {
      decorators: [HasRoles(Roles.ADMIN), HistoryLog('add some accounts')],
    },
    updateOneBase: {
      decorators: [
        UsePipes(ExcludePasswordPipe),
        HistoryLog('updated their account'),
      ],
    },
    exclude: ['deleteOneBase', 'createOneBase'],
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
  query: {
    join: {
      team: {},
      role: {},
    },
  },
})
@IsPassthrough()
export class AccountController {
  constructor(public service: AccountService) {}

  @Post('join-team')
  @HistoryLog('joined a team')
  joinTeam(@Body() dto: JoinTeamDto) {
    return this.service.joinTeam(dto);
  }
  @Delete(':id')
  @HistoryLog('Deleted an account')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
  @Public()
  @Post('')
  @HistoryLog('Deleted an account')
  verifyAndCreate(@Body() body: CreateAccountDto) {
    return this.service.createAccount(body);
  }

  @HasRoles(Roles.ADMIN)
  @Patch('enable/:id')
  enableAccount(@Param('id') accountId: string) {
    return this.service.repository.update(accountId, {
      isEnable: true,
    });
  }
  @HasRoles(Roles.ADMIN)
  @Patch('disable/:id')
  disableAccount(@Param('id') accountId: string) {
    return this.service.repository.update(accountId, {
      isEnable: false,
    });
  }
}
