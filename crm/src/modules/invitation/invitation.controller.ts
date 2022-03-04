import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { CreateInvitationDto } from './dto/create-invitation.dto';
import { UpdateInvitationDto } from './dto/update-invitation.dto';
import { Invitation } from './entities/invitation.entity';
import { InvitationService } from './invitation.service';
import { ValidationPipe } from './pipes/validation.pipe';

@Controller('invitation')
@Crud({
  model: {
    type: Invitation,
  },
  dto: {
    create: CreateInvitationDto,
    update: UpdateInvitationDto,
    replace: UpdateInvitationDto,
  },
  params: {
    id: {
      field: 'id',
      primary: true,
      type: 'string',
    },
  },
  query: {
    join: {
      sender: {},
      receivers: {},
    },
  },
  routes: {
    exclude: [
      'createOneBase',
      'createManyBase',
      'updateOneBase',
      'replaceOneBase',
    ],
  },
})
@ApiTags('invitation')
export class InvitationController {
  constructor(public readonly service: InvitationService) {}
  @Post()
  @UsePipes(ValidationPipe)
  createInvitation(@Body() dto: CreateInvitationDto) {
    return this.service.createInvitation(dto);
  }
}
