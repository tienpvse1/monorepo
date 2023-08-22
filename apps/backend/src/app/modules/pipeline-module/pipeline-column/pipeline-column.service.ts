import { resolve } from '@monorepo/common';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ExpressionBuilder } from 'kysely';
import { InjectKysely, Kysely } from '../../../kysely';
import { DB } from '../../../kysely/models';
import { CreatePipelineColumnDto } from './dto/create-pipeline-column.dto';
import { UpdatePipelineColumnDto } from './dto/update-pipeline-column.dto';

@Injectable()
export class PipelineColumnService {
  constructor(@InjectKysely private readonly kysely: Kysely) {}

  async softDelete(id: string) {
    return this.kysely
      .updateTable('pipelineColumn')
      .set({ deletedAt: new Date() })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
  }
  async addColumn(dto: CreatePipelineColumnDto) {
    const createFn = this.kysely
      .insertInto('pipelineColumn')
      .values(dto)
      .returningAll()
      .executeTakeFirst();
    const [createdColumn, err] = await resolve(createFn);
    if (err) throw new BadRequestException('cannot create column');
    return createdColumn;
  }

  async updateColumnIndex(id: string, { index }: UpdatePipelineColumnDto) {
    const updateFn = this.kysely
      .updateTable('pipelineColumn')
      .set({ index })
      .returningAll()
      .executeTakeFirstOrThrow();
    const [updatedColumn, err] = await resolve(updateFn);
    if (err) throw new BadRequestException('cannot update column');
    return updatedColumn;
  }

  async getColumns() {
    return this.kysely.selectFrom('pipelineColumn').selectAll().execute();
  }

  /**
   * reset won column in db then assign won to the desire column
   * @param id
   */
  async setWon(id: string) {
    await this.kysely
      .updateTable('pipelineColumn')
      .set({ isWon: false })
      .where((eb) =>
        eb.and([
          eb('isWon', '=', true),
          eb('pipelineId', '=', this.getPipelineId(id, eb)),
        ])
      )
      .execute();
    const updateFn = this.kysely
      .updateTable('pipelineColumn')
      .set({ isWon: true })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();
    const [updatedColumn, err] = await resolve(updateFn);
    if (err) throw new BadRequestException('cannot set pipeline column to won');
    return updatedColumn;
  }

  private getPipelineId(
    columnId: string,
    eb: ExpressionBuilder<DB, 'pipelineColumn'>
  ) {
    return eb
      .selectFrom('pipelineColumn')
      .select('pipelineColumn.pipelineId')
      .where('id', '=', columnId);
  }
}
