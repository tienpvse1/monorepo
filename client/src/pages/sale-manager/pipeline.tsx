import { Kanban } from '@components/sale-manager/pipeline/kanban';
import { IPipelineColumn } from '@modules/pipeline-column/entity/pipeline-column.entity';
import { getStages } from '@modules/pipeline-column/query/pipeline.get';
import { useEffect, useState } from 'react';

interface SaleManagerPipelineProps {}

const SaleManagerPipeline: React.FC<SaleManagerPipelineProps> = ({}) => {
  const [data, setData] = useState<IPipelineColumn[]>([]);

  // get initial data
  useEffect(() => {
    getStages().then((data) => setData(data));
  }, []);
  // update data when there's an event from server

  return (
    <div>
      <Kanban data={data} setData={setData} />
    </div>
  );
};
export default SaleManagerPipeline;
