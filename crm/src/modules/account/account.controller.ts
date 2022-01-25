import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/common/decorators/role/decorator';
import { User } from 'src/common/decorators/user.decorator';
import { Roles } from 'src/constance';
import { AUTHORIZATION } from 'src/constance/swagger';
import { FindManyOptions, FindOneOptions } from 'typeorm';
import { AccountService } from './account.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Account } from './entities/account.entity';

@Controller('account')
@ApiTags('account')
@UseInterceptors(ClassSerializerInterceptor)
@ApiBearerAuth(AUTHORIZATION)
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  /**
   * create an account
   */
  @Post()
  @HasRoles(Roles.ADMIN)
  create(@Body() createAccountDto: CreateAccountDto) {
    return this.accountService.create(createAccountDto);
  }

  /**
   * find account and paginate(admin and system can perform this only)
   */
  @Get('index')
  @HasRoles(Roles.SYSTEM, Roles.ADMIN)
  findAll(
    @Body() query: FindManyOptions<Account>,
    @Query('num', new DefaultValuePipe(1), ParseIntPipe) num = 1,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size = 10,
  ) {
    return this.accountService.paginate(query, num, size);
  }

  /**
   * get account by id
   */
  @Get('custom')
  findOne(@Body() filter: FindOneOptions<Account>) {
    return this.accountService.findMany(filter);
  }

  /**
   * update current account by id(authentication is require)
   */
  @Patch('')
  update(@User('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(id, updateAccountDto);
  }

  /**
   * delete account(soft delete only)
   */
  @Delete('')
  remove(@User('id') id: string) {
    return this.accountService.delete(id);
  }
  /**
   * delete account(completely remove from database)
   */
  @Delete('permanent')
  permanent(@User('id') id: string) {
    return this.accountService.permanentDelete(id);
  }
}
