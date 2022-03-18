import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { useQueryAllPipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';

const AllOpportunityList = () => {
  const { data, isLoading } = useQueryAllPipelineItem();
  const { data: contact } = useQueryAllContacts();

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
export default AllOpportunityList