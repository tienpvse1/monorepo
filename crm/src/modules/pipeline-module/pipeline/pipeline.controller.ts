import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { FindManyOptions, getCustomRepository } from 'typeorm';
import { AccountRepository } from '../../account/account.repository';
import { Account } from '../../account/entities/account.entity';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { Pipeline } from './entities/pipeline.entity';
import { PipelineService } from './pipeline.service';

@Controller('pipeline')
@ApiBearerAuth(AUTHORIZATION)
@ApiTags('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @Post()
  async create(
    @Body() { name }: CreatePipelineDto,
    @User('id') accountId: string,
  ) {
    const accountRepository = getCustomRepository(AccountRepository);
    return this.pipelineService.addWithOneToOneRelation<Account>(
      { name },
      accountId,
      accountRepository,
      'pipeline',
    );
  }

  @Get()
  findAll(@Body() filter: FindManyOptions<Pipeline>) {
    return this.pipelineService.findMany(filter);
  }

  @Get('/my-pipeline')
  findOne(@User('id') id: string) {
    return this.pipelineService.findOne({ where: { account: { id } } });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(id, updatePipelineDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineService.delete(id);
  }
}
