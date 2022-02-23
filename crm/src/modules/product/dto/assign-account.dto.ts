import { IsArray, Length } from 'class-validator';

export class AssignAccountDto {
  @Length(10)
  productId: string;
  @IsArray()
  accountIds: string[];
}
export class ParsedAssignAccountDto {
  productId: string;
  accountId: string;
}
