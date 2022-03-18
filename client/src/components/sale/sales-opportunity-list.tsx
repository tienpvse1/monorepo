import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { useContacts } from "@modules/contact/query/contact.get";
import { PUBLIC_USER_INFO } from "@constance/cookie";
import { useCookies } from "react-cookie";
import { useQueryPipelineByAccountId } from '@modules/pipeline-items/query/pipeline-item.get';

const SalesOpportunityList = () => {
  const [
    {
      public_user_info: { id },
    },
  ] = useCookies([PUBLIC_USER_INFO]);
  const { data, isLoading } = useQueryPipelineByAccountId(id);
  const { data: contact } = useContacts(id);
  console.log("contacttt:", contact);
  
  return (
    <div className="opportunities-container">
      <OpportunitiesTable
        dataSource={data}
        dataSelectBoxContact={contact}
        isLoading={isLoading}
      />
    </div>
  )
}
export default SalesOpportunityList