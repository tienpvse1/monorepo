import { DynamicModule, Logger, Module } from '@nestjs/common';
import 'dotenv/config';
import { CamelCasePlugin, Kysely, LogEvent, PostgresDialect } from 'kysely';
import { Pool } from 'pg';
export type KyselyConfig = {
  databaseName: string;
  host: string;
  port: number;
  user: string;
  password: string;
  camelCase?: boolean;
};
export const KYSELY_INSTANCE = 'kysely_instance';
@Module({})
export class KyselyModule {
  static forRoot(config: KyselyConfig): DynamicModule {
    const dialect = new PostgresDialect({
      pool: new Pool({
        database: config.databaseName,
        host: config.host,
        user: config.user,
        password: config.password,
        port: config.port,
        max: 10,
      }),
    });
    const db = new Kysely({
      dialect,
      log: this.log,
      ...(config.camelCase && { plugins: [new CamelCasePlugin()] }),
    });
    const service = {
      provide: KYSELY_INSTANCE,
      useValue: db,
    };
    return {
      module: KyselyModule,
      global: true,
      providers: [service],
      exports: [service],
    };
  }

  private static log(event: LogEvent) {
    if (
      event.level === 'error' &&
      (JSON.parse(process.env.KYSELY_LOGGING) as string[]).includes('error')
    ) {
      Logger.error(event.query.sql);
      Logger.error(event.query.parameters);
    }
  }
}
