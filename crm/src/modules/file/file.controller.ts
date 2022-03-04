import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { User } from 'src/common/decorators/user.decorator';
import { AUTHORIZATION } from 'src/constance/swagger';
import { getCustomRepository } from 'typeorm';
import { AccountRepository } from '../account/account.repository';
import { Account } from '../account/entities/account.entity';
import { FileService } from './file.service';

@Controller('file')
@ApiTags('file')
@ApiBearerAuth(AUTHORIZATION)
export class FileController {
  constructor(private readonly service: FileService) {}

  @Post('upload')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @HistoryLog('uploaded a file')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: './public/files',
        filename: (_req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtName = extname(file.originalname);
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @User('id') id: string,
  ) {
    try {
      if (files.length === 0) return;
      const accountRepository = getCustomRepository(AccountRepository);
      const file = files[0];
      await this.service.addWithRelation<Account>(
        {
          name: file.filename,
          url: `http://kienvt.tech/files/${file.filename}`,
        },
        id,
        accountRepository,
        'files',
      );
      return files;
    } catch (error) {}
  }
}
