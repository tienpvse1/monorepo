import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isString } from 'class-validator';
import {
  AssignAccountDto,
  ParsedAssignAccountDto,
} from '../dto/assign-account.dto';
@Injectable()
export class AssignAccountPipe implements PipeTransform {
  transform(value: AssignAccountDto) {
    if (value.accountIds.length <= 0)
      throw new BadRequestException('account ids cannot be empty array');
    if (value.productId.length < 10)
      throw new BadRequestException(
        'product id must have at least 10 characters',
      );
    const result: ParsedAssignAccountDto[] = value.accountIds.map((id) => {
      if (!isString(id)) throw new BadRequestException('id must be string');
      if (id.length < 10)
        throw new BadRequestException(
          "account's id must have at least 10 characters",
        );
      return {
        productId: value.productId,
        accountId: id,
      };
    });
    return result;
  }
}
