import { OpportunityTitleLost } from "@components/opportunity/opportunity-title-lost"
import { SearchBar } from "@components/search-bar"
import { IPipelineItem } from "@modules/pipeline-items/entity/pipeline-items.entity";
import { List, Typography } from "antd"
import { Link } from "react-router-dom"

interface OpportunityLostProps {
  dataSource?: IPipelineItem[];
  data?: IPipelineItem[];
  isLoading?: boolean;
  setDataOpportunityLost: (value: []) => void;
  searchMethod: (text: string, id: string) => Promise<any>;
}

export const OpportunityLost: React.FC<OpportunityLostProps> = ({
  dataSource,
  data,
  isLoading,
  setDataOpportunityLost,
  searchMethod
}) => {
  const dataFilterLose = dataSource?.filter((value) => value.isLose)

  // const totalOpportunity = useRef(dataSource?.length);
  // const totalLost = useRef(dataFilterLose?.length);

  return (
    <>
      <OpportunityTitleLost
        totalOpportunity={dataSource?.length}
        opportunityLost={dataFilterLose?.length}
      />
      <div className='container-page'>
        <List
          loading={isLoading}
          size="small"
          style={{ paddingLeft: '50px', paddingRight: '50px' }}
          header={
            <SearchBar
              placeholder="Search for name opportunity, email..."
              width={'40%'}
              float='right'
              setData={setDataOpportunityLost}
              getApi={searchMethod}
            />
          }
          dataSource={dataFilterLose}
          renderItem={item => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={<a href={`/opportunities/view-details/${item.id}`}>{item.name}</a>}
                description={
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{item.contact.email}</span>
                    <span>
                      <Typography.Text mark>[REASON] </Typography.Text> {item.reason?.reason}
                    </span>
                    <span></span>
                  </div>
                }
              />
              <Link className="my-link" to={`/opportunities/view-details/${item.id}`}>View Details</Link>
            </List.Item>
          )}
        >
        </List>
      </div>
    </>
  )
}