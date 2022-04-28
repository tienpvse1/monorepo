import { Is } from '@common/is';
import { Kanban } from '@components/forecast/kanban/kanban';
import { PageHeader } from '@components/forecast/page-header';
import { LineChart } from '@components/forecast/line-chart/line-chart';
import { PieChart } from '@components/forecast/pie-chart/pie-chart';
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
  const [view, setView] = useState<'kanban' | 'lineChart' | 'pieChart'>(
    'kanban'
  );
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
      <PageHeader data={data} setView={setView} view={view} />
      <Is condition={view === 'kanban'}>
        <Kanban data={data} setData={setData} />
      </Is>
      <Is condition={view === 'lineChart'}>
        <LineChart data={data} setData={setData} />
      </Is>
      <Is condition={view === 'pieChart'}>
        <PieChart data={data} setData={setData} />
      </Is>
    </div>
  );
};
export default ForecastKanban;
