import { OpportunitiesTable } from '@components/opportunity/opportunity-table';
import { useQueryAllContacts } from "@modules/contact/query/contact.get";
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { usePipelineItems } from '@modules/pipeline-items/query/pipeline-item.get';
import { useEffect, useState } from 'react';

const ListOfAllOpportunity = () => {
  const { data, isLoading } = usePipelineItems();
  const { data: contact } = useQueryAllContacts();

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
        dataSource={dataOpportunity}
        dataSelectBoxContact={contact}
        isLoading={isLoading}
        setDataOpportunity={setDataOpportunity}
      />
    </div>
  )
}
export default ListOfAllOpportunity