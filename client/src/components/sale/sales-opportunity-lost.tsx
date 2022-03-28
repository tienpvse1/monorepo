import { PUBLIC_USER_INFO } from "@constance/cookie";
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { useQueryPipelineByAccountId } from "@modules/pipeline-items/query/pipeline-item.get";
import { OpportunityLost } from "@pages/opportunity-lost";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const SalesOpportunityLost = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);

  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const [dataOpportunity, setDataOpportunity] = useState<IPipelineItem[]>();
  console.log("dataL", data);
  
  useEffect(() => {
    setDataOpportunity(data);
    return () => {
      // @ts-ignore
      setDataOpportunity([]);
    };
  }, [data]);


  return (
    <OpportunityLost dataSource={dataOpportunity} isLoading={isLoading}/>
  )
}

export default SalesOpportunityLost