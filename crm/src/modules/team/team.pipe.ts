import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isArray } from 'lodash';
import { checkDuplicate } from 'src/util/array';
import { Account } from '../account/entities/account.entity';
import { UpdateTeamPositionDto } from './dto/update-team.dto';

@Injectable()
export class UpdatePositionPipe implements PipeTransform {
  transform(value: UpdateTeamPositionDto[]) {
    if (!isArray(value)) throw new BadRequestException('dto must be iterable');
    const isDuplicate = checkDuplicate<UpdateTeamPositionDto>(value, 'index');

    if (isDuplicate)
      throw new BadRequestException('team index must not be duplicate');
    for (const item of value) {
      if (!item.accounts) continue;
      if (checkDuplicate<Account>(item.accounts, 'teamIndex'))
        throw new BadRequestException(
          'account in one team must have unique index',
        );
    }
    return value;
  }
}
