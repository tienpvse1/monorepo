import { envVars } from '@env/var.env';
import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import {
  Badge,
  Button,
  Col,
  Descriptions,
  PageHeader,
  Row,
  Space,
  Tag,
} from 'antd';
import moment from 'moment';

interface OpportunityTitleDetailsProps {
  opportunity?: IPipelineItem;
}

export const OpportunityTitleDetails: React.FC<
  OpportunityTitleDetailsProps
> = ({ opportunity }) => {
  return (
    <>
      <Badge.Ribbon
        text='Won'
        color='green'
        style={{
          marginRight: '20px',
          marginTop: '8px',
          display: opportunity.pipelineColumn.isWon ? 'flex' : 'none',
          alignItems: 'center',
          height: '26px',
          fontSize: '20px',
        }}
      >
        <PageHeader
          className='site-page-header'
          onBack={() => window.history.back()}
          extra={
            <>
              {!opportunity.pipelineColumn.isWon && (
                <Button
                  className='button-ant-custom-style'
                  type='primary'
                  size='middle'
                >
                  Lost
                </Button>
              )}
            </>
          }
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
                  src={`${envVars.VITE_BE_DOMAIN}/files/crown.png`}
                  width={47}
                  height={47}
                />
                <span>
                  {opportunity.name} <br />
                  <Tag color={'cyan'}>Opportunity</Tag>
                </span>
              </span>
            </>
          }
        >
          <Descriptions size='small' column={3}>
            <Descriptions.Item label='Serve by'>
              {opportunity.account.firstName} {opportunity.account.lastName}
            </Descriptions.Item>

            <Descriptions.Item label='Created at'>
              {moment(new Date(opportunity.createdAt)).fromNow()}
            </Descriptions.Item>
            <Descriptions.Item label='Expected revenue'>
              160k$
            </Descriptions.Item>
            <Descriptions.Item label='Expected closing'>
              {moment(new Date(opportunity.expectedClosing)).fromNow()}
            </Descriptions.Item>
          </Descriptions>
        </PageHeader>
      </Badge.Ribbon>
    </>
  );
};
