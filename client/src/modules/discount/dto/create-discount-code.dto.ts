export interface CreateDiscountCodeDto {
  discount_amount: string;
  discount_name: string;
  expired_at: string;
}

export interface IDiscountEmailDto {
  contactEmail: string;
  template: string;
}
