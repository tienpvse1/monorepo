import { envVars } from '@env/var.env';
import { Descriptions, PageHeader, Tag } from 'antd';
interface OpportunityTitleLostProps {
  totalOpportunity: number;
  opportunityLost: number;
}

export const OpportunityTitleLost: React.FC<OpportunityTitleLostProps> = ({
  opportunityLost = 0,
  totalOpportunity = 0
}) => {
  return (
    <>
      <div className='container-title-details-lost'>
        <PageHeader
          className='site-page-header'
          onBack={() => window.history.back()}
          title={
            <>
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <img
                  src={`${envVars.VITE_BE_DOMAIN}/files/sad.png`}
                  width={47}
                  height={47}
                />
                <span>
                  Total lost {`(${opportunityLost})`} <br />
                  <Tag color={'purple'}>Opportunity Lost</Tag>
                </span>
              </span>
            </>
          }
        >
          <Descriptions size='small' column={3}>
            <Descriptions.Item label='Total opportunity'>
              {totalOpportunity}
            </Descriptions.Item>

            <Descriptions.Item label='Lost opportunity'>
              {opportunityLost}
            </Descriptions.Item>
            <Descriptions.Item label='Expected loss of revenue'>
              160k$
            </Descriptions.Item>

          </Descriptions>
        </PageHeader>
      </div>
    </>
  )
}
