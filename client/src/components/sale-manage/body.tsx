import { ITeam } from '@modules/team/entity/team.entity';
import { Tabs } from 'antd';
import { Dispatch, SetStateAction } from 'react';
import { Kanban } from './kanban';
import { Table } from './table';

interface SaleManageBodyProps {
  data: ITeam[];
  setData: Dispatch<SetStateAction<ITeam[]>>;
  setReload: () => void;
}

export const SaleManageBody: React.FC<SaleManageBodyProps> = ({ data, setData, setReload }) => {

  return (
    <div
      style={{
        marginTop: 20,
      }}
    >
      <Tabs defaultActiveKey='1' type='line'>
        <Tabs.TabPane tab='Kanban' key='1'>
          <Kanban data={data} setData={setData} />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Table' key='2'>
          <Table setReload={setReload} data={data} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
