import { Kanban } from '@components/sale-manager/pipeline/kanban';
import { envVars } from '@env/var.env';
import { useSocket } from '@hooks/socket';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { getStages } from '@modules/pipeline-column/query/pipeline-column.get';
import { IPipeline } from '@modules/pipeline/entity/pipeline.entity';
import { abstractSort } from '@util/array';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
interface SaleManagerPipelineProps {}

const SaleManagerPipeline: React.FC<SaleManagerPipelineProps> = ({}) => {
  const [data, setData] = useState<IPipelineColumn[]>([]);
  useSocket({
    event: 'manager-pipeline-updated',
    onReceive: ({ pipelineColumns }: IPipeline) => {
      if (pipelineColumns) {
        abstractSort(pipelineColumns, 'pipelineItems');
        console.log(pipelineColumns);
        setData(pipelineColumns);
      }
    },
    socket,
  });
  // get initial data
  useEffect(() => {
    getStages().then((data) => {
      abstractSort(data, 'pipelineItems');
      setData(data);
    });
  }, []);
  // update data when there's an event from server

  return (
    <div>
      <Kanban data={data} setData={setData} />
    </div>
  );
};
export default SaleManagerPipeline;
