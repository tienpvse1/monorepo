import { Kanban } from '@components/forecast/kanban';
// import { envVars } from '@env/var.env';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { getPipelineUser } from '@modules/pipeline/query/pipeline.get';
import { abstractSort } from '@util/array';
import { categorizePipelineItem, getPipelineItems } from '@util/pipeline-item';
import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// const socket = io(`${envVars.VITE_BE_DOMAIN}/pipeline`);
interface ForecastKanban {}

const ForecastKanban: React.FC<ForecastKanban> = ({}) => {
  const [data, setData] = useState<IPipelineItem[][]>([]);
  // useSocket({
  //   event: 'manager-pipeline-updated',
  //   onReceive: ({ pipelineColumns }: IPipeline) => {
  //     if (pipelineColumns) {
  //       abstractSort(pipelineColumns, 'pipelineItems');
  //       console.log(pipelineColumns);
  //       setData(pipelineColumns);
  //     }
  //   },
  //   socket,
  // });
  // get initial data
  useEffect(() => {
    getPipelineUser().then(({ pipelineColumns: data }) => {
      abstractSort(data, 'pipelineItems');
      const result = categorizePipelineItem(getPipelineItems(data));
      setData(result);
    });
  }, []);
  // update data when there's an event from server

  return (
    <div>
      <Kanban data={data} setData={setData} />
    </div>
  );
};
export default ForecastKanban;
