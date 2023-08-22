import { Controller } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AUTHORIZATION } from '../../../constant';

@Controller('pipeline-column')
@ApiTags('pipeline columns')
@ApiBearerAuth(AUTHORIZATION)
export class PipelineColumnController {}
