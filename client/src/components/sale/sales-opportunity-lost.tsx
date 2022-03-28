import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { useQueryPipelineByAccountId } from "@modules/pipeline-items/query/pipeline-item.get";
import { OpportunityLost } from "@pages/opportunity-lost";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { searchPipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';

const SalesOpportunityLost = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const [dataOpportunityLost, setDataOpportunityLost] = useState<IPipelineItem[]>();
  console.log("dataL", data);

  useEffect(() => {
    setDataOpportunityLost(data);
    return () => {
      // @ts-ignore
      setDataOpportunityLost([]);
    };
  }, [data]);


  return (
    <OpportunityLost
      dataSource={dataOpportunityLost}
      data={data}
      isLoading={isLoading}
      setDataOpportunityLost={setDataOpportunityLost}
      searchMethod={searchPipelineItem}
    />
  )
}

export default SalesOpportunityLost