import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useCookies } from "react-cookie";
import { GET_PIPELINE_ITEM_BY_ACCOUNT, useQueryPipelineByAccountId } from '@modules/pipeline-items/query/pipeline-item.get';
import { useEffect, useState } from 'react';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { searchPipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';

const SalesOpportunityList = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useQueryPipelineByAccountId(id);
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
        queryKey={[GET_PIPELINE_ITEM_BY_ACCOUNT, id]}
        setDataOpportunity={setDataOpportunity}
        searchMethod={searchPipelineItem}
        dataSource={dataOpportunity}
        isLoading={isLoading}
      />
    </div>
  )
}
export default SalesOpportunityList