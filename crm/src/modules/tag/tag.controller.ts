import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { HistoryLog } from 'src/common/decorators/message.decorator';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagService } from './tag.service';

@Controller('tag')
@ApiTags('tag')
@Crud({
  model: {
    type: Tag,
  },
  dto: {
    create: CreateTagDto,
    update: UpdateTagDto,
  },
  routes: {
    createOneBase: {
      decorators: [HistoryLog('created a tag')],
    },
    updateOneBase: {
      decorators: [HistoryLog('updated a tag')],
    },
    deleteOneBase: {
      decorators: [HistoryLog('deleted a tag')],
    },
  },
})
export class TagController {
  constructor(public readonly service: TagService) {}
}
