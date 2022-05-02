import { PageHeader } from 'antd';

interface DiscountHeaderProps {}

export const DiscountHeader: React.FC<DiscountHeaderProps> = ({}) => {
  return (
    <div>
      <PageHeader
        className='site-page-header'
        onBack={() => null}
        title='Discount'
        subTitle='manage discount codes'
      />
    </div>
  );
};
