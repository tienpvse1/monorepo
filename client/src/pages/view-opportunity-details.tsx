import { OpportunityTitleDetails } from '@components/opportunity/opportunity-title-details';
import { usePipelineItem } from '@modules/pipeline-items/query/pipeline-item.get';
import { Col, Divider, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { OpportunityTimeLine } from '@components/opportunity/opportunity-timeline';
import { OpportunityInfoTabs } from '@components/opportunity/opportunity-info-tabs';
import { OpportunityStep } from '@components/opportunity/opportunity-step';
const ViewOpportunityDetails = () => {
  const params = useParams();
  const { data, isLoading } = usePipelineItem(params.id);

  console.log("dataL:", data);
  

  // TODO: this skeleton still hard code
  if(isLoading)
    return <div>this is skeleton</div>;

  return (
    <>
      {data &&
        <>
          <OpportunityTitleDetails opportunity={data} />
          <Row className='container-page'>
            <Col span={24}>
              <OpportunityStep data={data} />
            </Col>
          </Row>
          <Row gutter={[0, 0]}>
            <Col span={15}>
              <div className='container-content-details-page'>
                <OpportunityInfoTabs data={data} />
              </div>
            </Col>
            <Col span={9}>
              <div className='container-page'>
                <span style={{ fontSize: '16px' }}>History Logs</span>
                <Divider></Divider>
                <OpportunityTimeLine opportunityId={data.id} />
              </div>
            </Col>
          </Row>
        </>
      }
    </>
  );
};

export default ViewOpportunityDetails;
