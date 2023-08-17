import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileController } from './file.controller';
import { FileRepository } from './file.repository';
import { FileService } from './file.service';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [
    TypeOrmModule.forFeature([FileRepository]),
    MulterModule.register({
      dest: './upload',
    }),
  ],
})
export class FileModule {}
