import { Tabs } from 'antd';
import { Kanban } from './kanban';

interface SaleManageBodyProps {}

export const SaleManageBody: React.FC<SaleManageBodyProps> = ({}) => {
  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <Tabs defaultActiveKey='1' type='line'>
        <Tabs.TabPane tab='Kanban' key='1'>
          <Kanban />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Table' key='2'>
          Table View
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
