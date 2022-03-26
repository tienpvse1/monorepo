import { ManagerPipelineHeader } from '@components/sale-manager/pipeline/header';
import { Kanban } from '@components/sale-manager/pipeline/kanban';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import {
  GET_STAGES,
  useStages,
} from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { abstractSort } from '@util/array';
import { PageHeader } from 'antd';
import { io } from 'socket.io-client';
import { client } from '../../App';
const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
interface SaleManagerPipelineProps {}

const SaleManagerPipeline: React.FC<SaleManagerPipelineProps> = ({}) => {
  const { data } = useStages();
  useSocket({
    event: 'manager-pipeline-updated',
    onReceive: ({ pipelineColumns }: IPipeline) => {
      if (pipelineColumns) {
        console.log(pipelineColumns);
        abstractSort(pipelineColumns, 'pipelineItems');
        client.setQueryData(GET_STAGES, pipelineColumns);
      }
    },
    socket,
  });
  const setData = (pipelineColumns: IPipelineColumn[]) => {
    client.setQueryData(GET_STAGES, pipelineColumns);
  };
  return (
    <div>
      <ManagerPipelineHeader />
      <Kanban data={data} setData={setData} />
    </div>
  );
};
export default SaleManagerPipeline;
