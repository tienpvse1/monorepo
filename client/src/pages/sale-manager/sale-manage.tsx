import { SaleManageBody } from '@components/sale-manage/body';
import { SaleManageHeader } from '@components/sale-manage/header';

interface SaleManageProps {}

const SaleManage: React.FC<SaleManageProps> = ({}) => {
  return (
    <div>
      <SaleManageHeader />
      <SaleManageBody />
    </div>
  );
};

export default SaleManage;
