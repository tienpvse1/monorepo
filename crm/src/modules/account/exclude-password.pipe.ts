import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class ExcludePasswordPipe implements PipeTransform {
  transform(
    value: CreateAccountDto | UpdateAccountDto,
    metadata: ArgumentMetadata,
  ) {
    if (value.password) {
      value.password = undefined;
    }
    return value;
  }
}
