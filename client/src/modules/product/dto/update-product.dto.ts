import { ICreateProductDto } from "@modules/product/dto/create-product.dto";

export interface IUpdateProductDto extends Partial<ICreateProductDto> {}