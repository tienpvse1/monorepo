import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { GET_ALL_PIPELINE_ITEM, usePipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';
import { useEffect, useState } from 'react';
import { searchAllPipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';

const ListOfAllOpportunity = () => {
  const { data, isLoading } = usePipelineItems();
  const [dataOpportunity, setDataOpportunity] = useState<IPipelineItem[]>();

  useEffect(() => {
    setDataOpportunity(data);
    return () => {
      // @ts-ignore
      setDataOpportunity([]);
    };
  }, [data]);

  return (
    <div className="opportunities-container">
      <OpportunitiesTable
        queryKey={GET_ALL_PIPELINE_ITEM}
        dataSource={dataOpportunity}
        isLoading={isLoading}
        setDataOpportunity={setDataOpportunity}
        searchMethod={searchAllPipelineItem}
      />
    </div>
  )
}
export default ListOfAllOpportunity