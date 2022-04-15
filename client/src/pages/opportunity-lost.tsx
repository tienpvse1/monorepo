import { OpportunityTitleLost } from '@components/opportunity/opportunity-title-lost';
import { SearchBar } from '@components/search-bar';
import { useHandleNavigate } from '@hooks/useHandleNavigate';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { List, Typography } from 'antd';
import { Link } from 'react-router-dom';

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
  searchMethod,
}) => {
  const dataFilterLose = dataSource?.filter((value) => value.isLose);

  const { navigateRole } = useHandleNavigate();
  return (
    <>
      <OpportunityTitleLost
        totalOpportunity={data?.length}
        opportunityLost={data?.filter((value) => value.isLose).length}
        revenue={dataFilterLose?.reduce((acc, value) => {
          return acc + value.expectedRevenue;
        }, 0)}
      />
      <div className='container-page'>
        <List
          loading={isLoading}
          size='small'
          style={{ paddingLeft: '50px', paddingRight: '50px' }}
          header={
            <SearchBar
              placeholder='Search for name opportunity, email...'
              width={'40%'}
              float='right'
              setData={setDataOpportunityLost}
              getApi={searchMethod}
            />
          }
          dataSource={dataFilterLose}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                title={
                  <Link
                    className='my-link'
                    to={`${navigateRole}opportunities/view-details/${item.id}`}
                  >
                    {item.name}
                  </Link>
                }
                description={
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <span>{item.contact?.email}</span>
                    <span>
                      <Typography.Text mark>
                        {item.reason?.reason}
                      </Typography.Text>
                    </span>
                    <span></span>
                  </div>
                }
              />
              <Link
                className='my-link'
                to={`/opportunities/view-details/${item.id}`}
              >
                View Details
              </Link>
            </List.Item>
          )}
        ></List>
      </div>
    </>
  );
};
