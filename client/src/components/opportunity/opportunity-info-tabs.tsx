import { IPipelineItem } from '@modules/pipeline-items/entity/pipeline-items.entity';
import { Alert, Empty, Tabs } from 'antd'
import { ContactInfo } from './contact-info';
import { OpportunityDetails } from '@components/opportunity/opportunity-details';
import { FileTextOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;

interface OpportunityInfoTabsProps {
  data: IPipelineItem;
}

export const OpportunityInfoTabs: React.FC<OpportunityInfoTabsProps> = ({ data }) => {
  return (
    <>
      <Tabs
        size="large"
        defaultActiveKey='1'
        type='line'
      >
        <TabPane
          tab='Details'
          key='1'
        >
          <OpportunityDetails data={data} />
        </TabPane>
        <TabPane
          tab='Contact Info'
          key='2'
          style={{
            height: '60vh',
            overflowY: 'scroll',
          }}
        >
          <ContactInfo data={data} />
        </TabPane>
        {/* //TODO: these tab is still hard coded */}
        <TabPane tab='Task' key='3'>
          {data.schedules.length > 0 ? data.schedules.map((schedule) =>
          (<Alert
            key={schedule.id}
            message={schedule.type.toUpperCase()}
            type={
              schedule.type == 'todo' && 'info' ||
              schedule.type == 'email' && 'error' ||
              schedule.type == 'meeting' && 'warning' || 'success'
            }
            closable
            description={schedule.summary}
          />)
          ) : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        </TabPane>
        <TabPane tab='Notes' key='4'>
          <Alert
            message="Internal Notes"
            showIcon
            icon={<FileTextOutlined />}
            description={data.internalNotes ?  data.internalNotes : 'No notes were recorded'}
            type="warning"
          />
        </TabPane>
      </Tabs>
    </>
  )
}
