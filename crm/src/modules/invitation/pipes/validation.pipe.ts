import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isArray, isString } from 'lodash';
import { CreateInvitationDto } from '../dto/create-invitation.dto';

@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(values: CreateInvitationDto) {
    const { accountIds, senderId } = values;
    if (!isArray(accountIds)) throw new BadRequestException('must be array');
    for (const id of accountIds) {
      if (!isString(id))
        throw new BadRequestException(
          "each member of accounts's is must be string ",
        );
    }
    if (!isString(senderId))
      throw new BadRequestException('sender id must be string');
    if (accountIds.includes(senderId))
      throw new BadRequestException('receivers id can not include sender Id');
    return values;
  }
}
