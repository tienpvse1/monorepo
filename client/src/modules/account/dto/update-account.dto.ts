import { ICreateAccountDto } from './create-account.dto';

export interface IUpdateAccountDto extends Partial<ICreateAccountDto> {}
