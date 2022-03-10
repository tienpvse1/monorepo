import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { ITeam } from '@modules/team/entity/team.entity';
import { getTeams } from '@modules/team/query/team.get';
import { sortTeams } from '@util/array';
import { Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { Kanban } from './kanban';
import { Table } from './table';
const socket = io(`${envVars.VITE_BE_DOMAIN}/team`);

interface SaleManageBodyProps {}

export const SaleManageBody: React.FC<SaleManageBodyProps> = ({}) => {
  const [data, setData] = useState<ITeam[]>([]);
  const { data: socketData } = useSocket({
    event: 'team-updated',
    socket,
    onReceive: (e: ITeam[]) => sortTeams(e),
  });
  // get initial data
  useEffect(() => {
    getTeams().then((data) => setData(data));
  }, []);
  // update data when there's an event from server
  useEffect(() => {
    if (socketData) {
      setData(socketData);
    }
  }, [socketData]);

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
          <Table data={data} />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
};
