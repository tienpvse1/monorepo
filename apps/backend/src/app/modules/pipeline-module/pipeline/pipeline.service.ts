import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectKysely, Kysely } from '../../../kysely';
import { CreatePipelineDto } from './dto/create-pipeline.dto';

@Injectable()
export class PipelineService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}
  async findOwnOnePipeline(userId: string) {
    return this.kysely
      .selectFrom('pipeline')
      .leftJoin('accountPipeline', 'accountPipeline.pipelineId', 'pipeline.id')
      .where('accountPipeline.accountId', '=', userId)
      .selectAll('pipeline')
      .execute();
  }

  async createPipeline(dto: CreatePipelineDto, userId: string) {
    const createFn = this.kysely
      .insertInto('pipeline')
      .values(dto)
      .returningAll()
      .executeTakeFirst();
    const [createdPipeline, err] = await resolve(createFn);
    if (err) throw new BadRequestException('cannot create pipeline');
    await this.kysely
      .insertInto('accountPipeline')
      .values({ accountId: userId, pipelineId: createdPipeline.id })
      .executeTakeFirst();
    return createdPipeline;
  }
}
