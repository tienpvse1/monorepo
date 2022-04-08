import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KnexModule } from 'nestjs-knex';
import { ConfigModule } from '../config/config.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('app.dbHost'),
        port: config.get<number>('database.port'),
        username: 'root',
        password: config.get<string>('database.password'),
        database: config.get<string>('database.name'),
        entities: ['dist/modules/**/entities/*.entity{.ts,.js}'],
        logger: 'advanced-console',
        synchronize: true,
        logging: false,
      }),
    }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        config: {
          connection: {
            host: config.get<string>('app.dbHost'),
            port: config.get<number>('database.port'),
            user: 'root',
            password: config.get<string>('database.password'),
            database: config.get<string>('database.name'),
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
