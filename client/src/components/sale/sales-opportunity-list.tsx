import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { useContacts } from "@modules/contact/query/contact.get";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useCookies } from "react-cookie";
import { useQueryPipelineByAccountId } from '@modules/pipeline-items/query/pipeline-item.get';
import { useEffect, useState } from 'react';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';

const SalesOpportunityList = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  
  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const [dataOpportunity, setDataOpportunity] = useState<IPipelineItem[]>();
  const { data: contact } = useContacts(id);
  
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
        setDataOpportunity={setDataOpportunity}
        dataSource={dataOpportunity}
        dataSelectBoxContact={contact}
        isLoading={isLoading}
      />
    </div>
  )
}
export default SalesOpportunityList