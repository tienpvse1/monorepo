import { SaleManageBody } from '@components/sale-manage/body';
import { SaleManageHeader } from '@components/sale-manage/header';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { useToggle } from '@hooks/useToggle';
import { ITeam } from '@modules/team/entity/team.entity';
import { getTeams, getTeamsForManage } from '@modules/team/query/team.get';
import { sortTeams } from '@util/array';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io(`${envVars.VITE_BE_DOMAIN}/team`);
interface SaleManageProps {}

const SaleManage: React.FC<SaleManageProps> = ({}) => {
  const [data, setData] = useState<ITeam[]>([]);
  const [reload, setReload] = useToggle();

  const { data: socketData } = useSocket({
    event: 'team-updated',
    socket,
    onReceive: (e: ITeam[]) => sortTeams(e),
  });
  // get initial data
  useEffect(() => {
    getTeamsForManage().then((data) => setData(data));
  }, [reload]);
  // update data when there's an event from server
  useEffect(() => {
    if (socketData) {
      setData(socketData);
    }
  }, [socketData]);

  return (
    <div className='container-page'>
      <SaleManageHeader setReload={setReload} />
      <SaleManageBody data={data} setData={setData} setReload={setReload} />
    </div>
  );
};

export default SaleManage;
