import { Controller, Delete, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { SubjectService } from './subject.service';

@Controller('subject')
@ApiTags('subject')
@Crud({
  model: {
    type: Subject,
  },
  dto: {
    create: CreateSubjectDto,
    update: UpdateSubjectDto,
    replace: UpdateSubjectDto,
  },
  routes: {
    exclude: ['deleteOneBase'],
  },
  query: {
    join: {
      course: {},
    },
  },
  params: {
    id: {
      type: 'string',
      field: 'id',
      primary: true,
    },
  },
})
export class SubjectController {
  constructor(public service: SubjectService) {}
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.softDelete(id);
  }
}
