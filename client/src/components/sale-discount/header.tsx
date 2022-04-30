import { PageHeader } from "antd";

interface SaleDiscountProps {}

export const SaleDiscountHeader: React.FC<SaleDiscountProps> = ({}) => {
  return (
    <div>
      <PageHeader
        className='site-page-header'
        onBack={() => null}
        title='Discount'
        subTitle=''
      />
    </div>
  );
};
