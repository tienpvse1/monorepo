import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { CreateDiscountCodeDto } from './create-discount-code.dto';

export const generateDiscountTemplate = (
  dto: CreateDiscountCodeDto,
  pipelineItem: PipelineItem,
  discountId: string,
  domain: string,
) => {
  return `<h1>${dto.discount_name}</h1>
  <h3>Claim your ${dto.discount_amount * 100}% discount</h3>`;
};
