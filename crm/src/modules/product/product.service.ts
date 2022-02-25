import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/base/nestjsx.service';
import { checkDateValid, convertDate, convertDateFromDb } from 'src/util/date';
import { Repository } from 'typeorm';
import { AccountService } from '../account/account.service';
import { Account } from '../account/entities/account.entity';
import { ProductAccountService } from '../product-account/product-account.service';
import { ParsedAssignAccountDto } from './dto/assign-account.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectRepository(Product) repository: Repository<Product>,
    private accountService: AccountService,
    private productAccount: ProductAccountService,
  ) {
    super(repository);
  }

  async assignAccounts(dtos: ParsedAssignAccountDto[]) {
    const bulk: { product: Product; account: Account }[] = [];
    for (const dto of dtos) {
      const account = await this.accountService.findOneItem({
        where: { id: dto.accountId },
      });
      const product = await this.findOneItem({ where: { id: dto.productId } });
      bulk.push({
        product,
        account,
      });
    }
    return this.productAccount.createManyItem(bulk);
  }

  async validateUpdateData(id: string, value: UpdateProductDto) {
    if (value.endDate == undefined && value.startDate == undefined)
      return value;
    // check both date to each other because both are new date
    if (value.endDate != undefined && value.startDate != undefined) {
      value.endDate = convertDate(value.endDate as string);
      value.startDate = convertDate(value.startDate as string);
      if (
        !checkDateValid({ startDate: value.startDate, endDate: value.endDate })
      ) {
        throw new BadRequestException('end date must greater than start date');
      }
      return value;
    }
    const product = await this.findOne({
      where: { id },
    });
    if (!product) throw new NotFoundException('item not found');
    if (value.endDate) {
      value.endDate = convertDate(value.endDate.toString());

      const startDateToCheck = convertDateFromDb(product.startDate.toString());

      if (
        !checkDateValid({
          startDate: startDateToCheck,
          endDate: value.endDate,
        })
      ) {
        throw new BadRequestException(
          `end date must greater than start date in database, database's start date: ${product.startDate} `,
        );

        return value;
      }
    }
    if (value.startDate) {
      value.startDate = convertDate(value.startDate.toString());
      const endDateToCheck = convertDateFromDb(product.endDate.toString());
      if (
        !checkDateValid({
          startDate: value.startDate,
          endDate: endDateToCheck,
        })
      ) {
        throw new BadRequestException(
          `end date must greater than start date in database, database's start date: ${product.startDate} `,
        );
        return value;
      }
    }
    return value;
  }
}
