import { DiscountTable } from '@components/sale-discount/discount-table';
import { SaleDiscountHeader } from '@components/sale-discount/header';
import { Spin } from 'antd';
import { Suspense } from 'react';
interface SaleDiscountPageProps {}

const SaleDiscountPage: React.FC<SaleDiscountPageProps> = ({}) => {
  return (
    <div className='container-page'>
      <SaleDiscountHeader />
      <Suspense fallback={<Spin />}>
        <DiscountTable />
      </Suspense>
    </div>
  );
};

export default SaleDiscountPage;
