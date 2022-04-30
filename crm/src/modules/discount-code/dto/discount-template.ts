import { PipelineItem } from 'src/modules/pipeline-module/pipeline-item/entities/pipeline-item.entity';
import { CreateDiscountCodeDto } from './create-discount-code.dto';

export const generateDiscountTemplate = (
  dto: CreateDiscountCodeDto,
  pipelineItem: PipelineItem,
  discountId: string,
  domain: string,
) => {
  return `<h1>${dto.discount_name}</h1>
  <h3>Claim your ${dto.discount_amount * 100}% discount</h3>
  <table>
    <tr>
      <th>NO.</th>
      <th>Course</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
    <tr>
      <td>1</td>
      <td>${pipelineItem.opportunityRevenue.course.name}</td>
      <td>${pipelineItem.opportunityRevenue.quantity}</td>
      <td>${pipelineItem.opportunityRevenue.course.price}</td>
    </tr>
  </table>
  <h3 style="text-align:center;text-decoration: line-through;">Total: ${
    pipelineItem.opportunityRevenue.course.price *
    pipelineItem.opportunityRevenue.quantity
  }vnd</h3>
  <h2 style="color: red">Now only ${
    pipelineItem.opportunityRevenue.course.price *
      pipelineItem.opportunityRevenue.quantity -
    pipelineItem.opportunityRevenue.course.price *
      pipelineItem.opportunityRevenue.quantity *
      dto.discount_amount
  }</h2>
  <a href="${domain}api/v1/apply/${discountId}">Apply now</a>`;
};
