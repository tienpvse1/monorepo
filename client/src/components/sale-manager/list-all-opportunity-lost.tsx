import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { OpportunityLost } from "@pages/opportunity-lost";
import { useEffect, useState } from "react";
import { searchAllPipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';
import { usePipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';

const ListAllOpportunityLost = () => {
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
    <OpportunityLost
      dataSource={dataOpportunity}
      data={data}
      isLoading={isLoading}
      setDataOpportunityLost={setDataOpportunity}
      searchMethod={searchAllPipelineItem}
    />
  )
}
export default ListAllOpportunityLost;